
'use client';

import { useState } from 'react';
import {
  Smile,
  Frown,
  Meh,
  Heart,
  Brain,
  Loader2,
  PenSquare,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { analyzeMoodEntry } from '@/ai/flows/analyze-mood-entry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const moods = [
  { name: 'Happy', Icon: Smile, color: 'text-green-500' },
  { name: 'Sad', Icon: Frown, color: 'text-blue-500' },
  { name: 'Calm', Icon: Meh, color: 'text-purple-500' },
  { name: 'Anxious', Icon: Brain, color: 'text-yellow-500' },
  { name: 'Loved', Icon: Heart, color: 'text-red-500' },
];

export default function MoodCheckInPage() {
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedMood) {
      toast({
        variant: 'destructive',
        title: 'Please select a mood.',
        description: 'You need to select a mood before submitting.',
      });
      return;
    }
    if (!journalEntry.trim()) {
      toast({
        variant: 'destructive',
        title: 'Please write something.',
        description: 'Your journal entry is empty.',
      });
      return;
    }

    setIsLoading(true);
    setAiFeedback(null);

    try {
      const response = await analyzeMoodEntry({
        mood: selectedMood,
        journalEntry,
      });
      setAiFeedback(response.feedback);
    } catch (error) {
      console.error('Error analyzing mood entry:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was an error analyzing your entry. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3">
        <PenSquare className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Mood Check-In</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>
            Select a mood that best describes how you feel right now.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-center gap-4">
          {moods.map(({ name, Icon, color }) => (
            <button
              key={name}
              onClick={() => setSelectedMood(name)}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all w-24 h-24',
                selectedMood === name
                  ? 'bg-primary/10 border-primary'
                  : 'bg-card hover:bg-accent border-transparent',
                color
              )}
            >
              <Icon className="h-8 w-8" />
              <span className="text-sm font-medium text-card-foreground">
                {name}
              </span>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reflect on your mood</CardTitle>
          <CardDescription>
            What influenced your mood today? You can write as little or as much
            as you like.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Today I feel..."
            rows={6}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isLoading} size="lg">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Analyzing...' : 'Submit & Get Feedback'}
        </Button>
      </div>

      {isLoading && (
         <Card>
            <CardHeader>
                <CardTitle>Your AI Insight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </CardContent>
         </Card>
      )}

      {aiFeedback && (
        <Alert className="animate-in fade-in-50 duration-500">
          <Brain className="h-4 w-4" />
          <AlertTitle className="font-bold">A Thought For You</AlertTitle>
          <AlertDescription className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{aiFeedback}</ReactMarkdown>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
