
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { surveyQuestions } from "@/lib/data";
import type { UserProfile, SurveyAnswers, StoredState, HistoricalScore } from "@/lib/types";
import { analyzeSurveyResponses } from "@/ai/flows/analyze-survey-responses";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  age: z.coerce.number().min(13, "You must be at least 13 years old.").max(100),
  profession: z.enum(["Student", "Professional", "House Parent"], {
    required_error: "Please select a profession.",
  }),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
    required_error: "Please select a gender.",
  }),
});

const surveyOptions = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Agree", value: 3 },
  { label: "Strongly Agree", value: 4 },
];

export default function SurveyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<"profile" | "survey">("profile");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      age: 18,
      gender: "Prefer not to say",
    },
  });

  const questions = profile ? surveyQuestions[profile.profession] : [];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    setProfile(values as UserProfile);
    setStep("survey");
  }

  const handleAnswerChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: parseInt(value, 10) }));
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const handleSurveySubmit = async () => {
    if (!profile) return;
    setIsLoading(true);

    try {
      const response = await analyzeSurveyResponses({
        age: profile.age,
        profession: profile.profession,
        surveyResponses: answers,
      });

      const score = Math.round(
        (Object.values(answers).reduce((sum, val) => sum + val, 0) /
          (Object.keys(answers).length * 4)) *
          100
      );

      const existingStateRaw = localStorage.getItem("mindbloom_state");
      const existingState: Partial<StoredState> = existingStateRaw ? JSON.parse(existingStateRaw) : {};

      const newHistoricalScore: HistoricalScore = {
        date: new Date().toISOString(),
        score: score,
      };
      
      const updatedHistoricalScores = [...(existingState.historicalScores || []), newHistoricalScore];

      const newState: StoredState = {
        profile,
        summary: response.summary,
        score,
        historicalScores: updatedHistoricalScores,
      };

      localStorage.setItem("mindbloom_state", JSON.stringify(newState));

      router.push("/dashboard");
    } catch (error) {
      console.error("Error analyzing survey:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing your responses. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered = currentQuestion ? answers[currentQuestion.question] !== undefined : false;

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
       {step === "profile" && (
         <Card className="w-full max-w-lg animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle>Welcome to MindBloom</CardTitle>
            <CardDescription>
              Let's get to know you a bit. This will help us tailor your experience.
            </CardDescription>
          </CardHeader>
           <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="Your age" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select your profession" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Student">Student</SelectItem>
                            <SelectItem value="Professional">Professional</SelectItem>
                            <SelectItem value="House Parent">House Parent</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="flex justify-end pt-4">
                  <Button type="submit">Continue</Button>
                </div>
                </form>
            </Form>
           </CardContent>
         </Card>
       )}

      {step === "survey" && profile && (
        <Card className="w-full max-w-2xl animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle>Your Personalized Survey</CardTitle>
             <Progress value={progress} className="w-full mt-2" />
          </CardHeader>
          <CardContent className="space-y-8 min-h-[200px]">
            {currentQuestion && (
              <div key={currentQuestionIndex} className="space-y-4 animate-in fade-in-50 duration-500">
                <Label htmlFor={`q-${currentQuestionIndex}`}>{`${currentQuestion.number}. ${currentQuestion.question}`}</Label>
                <RadioGroup
                  id={`q-${currentQuestionIndex}`}
                  value={String(answers[currentQuestion.question] || '')}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.question, value)}
                  className="flex flex-wrap items-center gap-4"
                >
                  {surveyOptions.map(option => (
                     <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={String(option.value)} id={`q-${currentQuestionIndex}-o-${option.value}`} />
                        <Label htmlFor={`q-${currentQuestionIndex}-o-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            <div className="flex justify-between items-center pt-4">
               <Button variant="ghost" onClick={handleBack} disabled={currentQuestionIndex === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
               </Button>
               {isLastQuestion && (
                 <Button
                    onClick={handleSurveySubmit}
                    disabled={isLoading || !isCurrentQuestionAnswered}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Analyzing..." : "Submit & See Results"}
                  </Button>
               )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
