// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
const courseOutlineConfig = {
  temperature: 0.3,
  topP: 0.95,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
  systemInstruction: [
    {
      text: `The content will be in the given language but structure keywords like courseTitle,courseType remain in english
          Format your response as a JSON object with the following exact structure:
          
          {
            "courseTitle": "string - The main title of the course",
            "courseType": "string - job interview/exam/other",
            "difficulty": "string - Easy/Medium/Hard",
            "language" : "string - language"
            "courseSummary": "string - 2-3 sentences describing the course comprehensively, tailored to the course type",
            "chapters": [
              {
                "chapterTitle": "string - Chapter name",
                "emoji": "emoji for the chapter",
                "chapterSummary": "string - 1-2 sentences describing what this chapter covers",
                "topics": [
                  "string - Topic 1",
                  "string - Topic 2",
                  "etc."
                ]
              }
            ]
          }`,
    }
  ],
};

const model = 'gemini-2.5-flash-lite';
//const model = 'gemini-2.5-flash';
//const model = 'gemini-flash-lite-latest';
//const model = 'gemini-flash-latest'; // slow model
 



export const courseOutlineAIModel = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      config: courseOutlineConfig,
      contents: prompt,
    });
    // const response = result;
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Course Outline AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};


const generateNotesConfig = {
  temperature: 1,
  topP: 0.95,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
  systemInstruction: [
    {
      text: `INSTRUCTIONS:
              - If the context is not appropriate or irrelevant with difficulty level and course type use your own knowledge.
              - Use the provided Context if relevant.
              - If the context is empty, rely on your general knowledge.
              - Include all key topics mentioned in the chapter details.
              - Format as clean HTML fragments (NO <html>, <head>, <body>, or <title> tags).
              - Use semantic HTML5 tags: <h2>, <h3>, <h4>, <p>, <ul>, <li>, <strong>, <em>, <code>, <section>.
              - Use <ul> and <li> tags for all lists (never use asterisks or dashes).
              - Ensure strictly academic tone.
              - Follow bloom's level fo better notes making
              -each sub topic should have decent level of details and examples`,
    }
  ],
}


export const generateNotesAiModel = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      config: generateNotesConfig,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Generate Notes AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};

const generateFlashCardsConfig = {
  temperature: 1,
  topP: 0.95,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
  systemInstruction: [
    {
      text: `The content will be in the given language but structure keywords like topic,flashcards remain in english
      ## CRITICAL: Output Structure
**NEVER modify this JSON structure. Always use exactly this format:**

\`\`\`json
{
  "topic": "string",
  "total_cards": number,
  "flashcards": [
    {
      "id": number,
      "bloom_level": "Remember|Understand|Apply|Analyze|Evaluate|Create",
      "cognitive_level": number (1-6),
      "question": "string",
      "answer": "string",
      "difficulty": "easy|medium|hard",
      "tags": ["string"]
    }
  ]
}
\`\`\`

## Rules
- Create  max 12 total flashcard.
- Use Bloom's levels.
- Progress from simple recall to complex creation
- Use exact field names and structure above
- Ensure valid JSON syntax

## Bloom's Levels
1. **Remember**: Recall facts (Define, List, Name)
2. **Understand**: Explain concepts (Explain, Summarize, Compare)


Output only valid JSON. No explanations.`,
    }
  ],
};

export const generateFlashCardsAiModel = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      config: generateFlashCardsConfig,
      contents: prompt,
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Generate Flash Cards AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};



const GenerateQuizConfig = {
  responseMimeType: 'application/json',
  systemInstruction: [
    {
      text: `The content will be in the given language but structure keywords like quizTitle,questions remain in english
      Format your response as a JSON object with the following exact structure:
 
{
  "quizTitle": "string - The main title of the quiz",
  "questions": [
    {
      "question": "string - question?",
      "options": ["option1", "option2", "option3", "option4"],
      "answer": "string -  answer "
    },
    {
      "question": "question?",
      "options": ["Option1", "Option2", "Option3", "Option4"],
      "answer": "string - answer"
    }
  ]
}

## Rules
- Create max 10 quiz.
- Use Bloom's levels.
- Use exact field names and structure above
- Ensure valid JSON syntax

## Bloom's Levels
- **Analyze**: Draw connections (Analyze, Differentiate, Examine)
`,
    }
  ],
};

export const GenerateQuizAiModel = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      config: GenerateQuizConfig,
      contents: prompt,
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Generate Quiz AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};


const GenerateQnAConfig = {
  thinkingConfig: {
    thinkingBudget: 0,
  },
  responseMimeType: 'application/json',
  systemInstruction: [
    {
      text: `
          The content will be in the given language but structure keywords like qna_list,question,answer remain in english
      Format your response as a JSON object with the following exact structure:
          {
  "qna_list": [
    {
      "question": "string - question?",
      "answer": "string - answer"
    },
    {
      "question": "string - question?",
      "answer": "string - answer"
    }
}

## Rules
- Create max 10 qna.
- Use Bloom's levels.
- Use exact field names and structure above
- Ensure valid JSON syntax

## Bloom's Levels
- **Evaluate**: Justify decisions (Evaluate, Critique, Argue)
- **Create**: Produce original work (Design, Develop, Formulate)
`,
    }
  ],
};

export const GenerateQnAAiModel = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      config: GenerateQnAConfig,
      contents: prompt,
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Generate QnA AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};