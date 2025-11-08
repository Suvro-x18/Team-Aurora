
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, CalendarCheck2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { weeklyReviewQuestions, surveyOptions } from '@/lib/data';
import type { SurveyAnswers, StoredState, HistoricalScore } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';

export default function WeeklyReviewPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = weeklyReviewQuestions;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: parseInt(value, 10) }));
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const handleSurveySubmit = async () => {
    setIsLoading(true);

    try {
      const score = Math.round(
        (Object.values(answers).reduce((sum, val) => sum + val, 0) /
          (Object.keys(answers).length * 4)) *
          100
      );

      const existingStateRaw = localStorage.getItem('mindbloom_state');
      if (!existingStateRaw) {
        toast({
            variant: "destructive",
            title: "No Profile Found",
            description: "Please complete the initial survey first."
        })
        router.push('/survey');
        return;
      }

      const existingState: StoredState = JSON.parse(existingStateRaw);

      const newHistoricalScore: HistoricalScore = {
        date: new Date().toISOString(),
        score: score,
      };

      const updatedHistoricalScores = [
        ...existingState.historicalScores,
        newHistoricalScore,
      ];

      const newState: StoredState = {
        ...existingState,
        score, // Update the main score as well
        historicalScores: updatedHistoricalScores,
      };

      localStorage.setItem('mindbloom_state', JSON.stringify(newState));
       // Dispatch a storage event to notify other components (like the dashboard) of the change.
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "Weekly Review Submitted!",
        description: "Your wellness score has been updated.",
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting weekly review:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description:
          'There was an error saving your review. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const progress =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;
  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered = currentQuestion
    ? answers[currentQuestion.question] !== undefined
    : false;

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-in fade-in-50 duration-500">
        <div className="w-full max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
                <CalendarCheck2 className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-headline">Weekly Review</h1>
            </div>
            <Card>
                <CardHeader>
                <CardTitle>Your Weekly Check-in</CardTitle>
                <CardDescription>Reflect on your past week to track your progress.</CardDescription>
                <Progress value={progress} className="w-full mt-2" />
                </CardHeader>
                <CardContent className="space-y-8 min-h-[200px]">
                {currentQuestion && (
                    <div
                    key={currentQuestionIndex}
                    className="space-y-4 animate-in fade-in-50 duration-500"
                    >
                    <Label
                        htmlFor={`q-${currentQuestionIndex}`}
                    >{`${currentQuestion.number}. ${currentQuestion.question}`}</Label>
                    <RadioGroup
                        id={`q-${currentQuestionIndex}`}
                        value={String(answers[currentQuestion.question] || '')}
                        onValueChange={(value) =>
                        handleAnswerChange(currentQuestion.question, value)
                        }
                        className="flex flex-wrap items-center gap-4"
                    >
                        {surveyOptions.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                            value={String(option.value)}
                            id={`q-${currentQuestionIndex}-o-${option.value}`}
                            />
                            <Label
                            htmlFor={`q-${currentQuestionIndex}-o-${option.value}`}
                            >
                            {option.label}
                            </Label>
                        </div>
                        ))}
                    </RadioGroup>
                    </div>
                )}
                <div className="flex justify-between items-center pt-4">
                    <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                    </Button>
                    {isLastQuestion && (
                    <Button
                        onClick={handleSurveySubmit}
                        disabled={isLoading || !isCurrentQuestionAnswered}
                    >
                        {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isLoading ? 'Saving...' : 'Complete Review'}
                    </Button>
                    )}
                </div>
                </CardContent>
            </Card>
      </div>
    </div>
  );
}
