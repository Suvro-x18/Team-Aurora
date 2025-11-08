'use server';

/**
 * @fileOverview A flow for analyzing a user's mood check-in entry.
 *
 * - analyzeMoodEntry - A function that analyzes a mood and journal entry.
 * - AnalyzeMoodEntryInput - The input type for the analyzeMoodEntry function.
 * - AnalyzeMoodEntryOutput - The return type for the analyzeMoodEntry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMoodEntryInputSchema = z.object({
  mood: z.string().describe('The user\'s selected mood (e.g., "Happy", "Sad", "Anxious").'),
  journalEntry: z.string().describe('The user\'s journal entry about their mood.'),
});
export type AnalyzeMoodEntryInput = z.infer<
  typeof AnalyzeMoodEntryInputSchema
>;

const AnalyzeMoodEntryOutputSchema = z.object({
  feedback: z.string().describe('Compassionate and insightful feedback on the user\'s entry, formatted in markdown.'),
});
export type AnalyzeMoodEntryOutput = z.infer<
  typeof AnalyzeMoodEntryOutputSchema
>;

export async function analyzeMoodEntry(
  input: AnalyzeMoodEntryInput
): Promise<AnalyzeMoodEntryOutput> {
  return analyzeMoodEntryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMoodEntryPrompt',
  input: {schema: AnalyzeMoodEntryInputSchema},
  output: {schema: AnalyzeMoodEntryOutputSchema},
  prompt: `You are an empathetic AI mental health assistant. A user has just submitted a mood check-in.
  Your task is to provide a short, compassionate, and insightful piece of feedback based on their entry.

  User's Mood: {{{mood}}}
  User's Journal Entry:
  "{{{journalEntry}}}"

  Please provide feedback that:
  - Validates their feelings.
  - Offers a gentle perspective or a simple reflective question.
  - Is supportive and non-judgmental.
  - Is 2-3 sentences long.
  - Is formatted as a simple paragraph, not a list.
  `,
});

const analyzeMoodEntryFlow = ai.defineFlow(
  {
    name: 'analyzeMoodEntryFlow',
    inputSchema: AnalyzeMoodEntryInputSchema,
    outputSchema: AnalyzeMoodEntryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
