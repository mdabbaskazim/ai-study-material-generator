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
- Create 2 cards per Bloom level (12 total)
- Progress from simple recall to complex creation
- Use exact field names and structure above
- Ensure valid JSON syntax

## Bloom's Levels
1. **Remember**: Recall facts (Define, List, Name)
2. **Understand**: Explain concepts (Explain, Summarize, Compare)
3. **Apply**: Use in new situations (Apply, Demonstrate, Solve)
4. **Analyze**: Draw connections (Analyze, Differentiate, Examine)
5. **Evaluate**: Justify decisions (Evaluate, Critique, Argue)
6. **Create**: Produce original work (Design, Develop, Formulate)

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
}`,
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