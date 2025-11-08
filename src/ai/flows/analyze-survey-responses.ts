import { getGeminiModel } from "@/ai/genkit";
import { z } from "zod";

// Input schema
const AnalyzeSurveyResponsesInputSchema = z.object({
  responses: z.array(z.string()).optional(), // mark optional
});

// Output schema
const AnalyzeSurveyResponsesOutputSchema = z.object({
  summary: z.string(),
});

// AI function
export async function analyzeSurveyResponses(input: z.infer<typeof AnalyzeSurveyResponsesInputSchema>) {
  try {
    const responses = Array.isArray(input.responses)
      ? input.responses
      : [String(input.responses || "No responses provided")];

    const responsesText = responses.join("\n");

    const model = getGeminiModel("gemini-1.5-pro");

    const prompt = `
    You are a mental health assistant. Analyze these responses:
    ${responsesText}
    Summarize the main emotional tone and suggest one wellness tip.
    `;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    return { summary: text };
  } catch (err) {
    console.error("Error analyzing survey:", err);
    return { summary: "Sorry, something went wrong while analyzing responses." };
  }
}
