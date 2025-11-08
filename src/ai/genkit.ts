// src/ai/genkit.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
export const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiModel = (model = "gemini-1.5-pro") =>
  ai.getGenerativeModel({ model });
