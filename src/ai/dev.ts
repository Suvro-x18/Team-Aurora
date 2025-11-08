
import { config } from 'dotenv';
config();

import './index';
import '@/ai/flows/analyze-survey-responses.ts';
import '@/ai/flows/analyze-mood-entry.ts';
import '@/ai/flows/chat.ts';
