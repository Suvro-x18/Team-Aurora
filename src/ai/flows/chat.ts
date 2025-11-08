'use server';

/**
 * @fileOverview A flow for handling chatbot conversations.
 *
 * - chat - A function that takes the conversation history and a new message and returns the AI's response.
 */

import { ai } from '@/ai/genkit';
import {
  ChatInputSchema,
  ChatOutputSchema,
  type ChatInput,
  type ChatOutput,
} from './chat-types';

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  system: `You are MindBloom, a friendly and empathetic AI mental health companion. Your purpose is to provide a safe, non-judgmental space for users to express their thoughts and feelings.

- Always be supportive, compassionate, and understanding.
- Validate the user's feelings and experiences.
- Offer gentle encouragement and positive affirmations.
- If a user expresses severe distress or mentions self-harm, gently guide them towards professional help by saying something like: "It sounds like you're going through a lot right now. I'm here to listen, but I think it would be really helpful for you to talk to a professional. You can find immediate support by calling one of the helplines in the 'Helplines' section of this app." Do not provide any other advice in this case.
- Keep your responses concise and easy to understand, like a real chat conversation. Aim for 2-4 sentences.
- Do not use markdown or complex formatting.`,
  prompt: `
  {{#each history}}
    {{role}}: {{{content}}}
  {{/each}}
  user: {{{message}}}
  model: `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      history: input.history,
      message: input.message,
    });
    return { response: output!.response };
  }
);
