// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
const config = {
  temperature: 0.3,
  topP: 0.95,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

const model = 'gemini-2.5-flash-lite';



export const courseOutlineAIModel = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      config: config,
      contents: prompt,
    });
    // const response = result;
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Course Outline AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
}


export const generateNotesAiModel = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: model,
      config: generationConfig,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Generate Notes AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};

const generationConfig2 = {
  temperature: 1,
  topP: 0.95,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
  systemInstruction: [
    {
      text: `## CRITICAL: Output Structure
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
      config: generationConfig2,
      contents: prompt,
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Generate Flash Cards AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};



const quizConfig = {
  responseMimeType: 'application/json',
  systemInstruction: [
    {
      text: `Format your response as a JSON object with the following exact structure:
 
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
      config: quizConfig,
      contents: prompt,
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Generate Quiz AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};


 const QnAconfig = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: 'application/json',
    systemInstruction: [
        {
          text: `{
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
      config: QnAconfig,
      contents: prompt,
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Generate QnA AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};