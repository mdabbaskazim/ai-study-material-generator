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

  const model = 'gemini-2.0-flash';



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
    console.error("AI Model Error:", error);
    return null; // Return null to indicate an error
  }
};
