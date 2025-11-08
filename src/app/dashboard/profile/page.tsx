"use client";

import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import type { UserProfile } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  age: z.coerce.number().min(13, "You must be at least 13 years old.").max(100),
  profession: z.enum(["Student", "Professional", "House Parent"]),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  avatarUrl: z.string().optional(),
});

export default function ProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      gender: "Prefer not to say",
    },
  });

  useEffect(() => {
    try {
      const storedState = localStorage.getItem("mindbloom_state");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        setProfile(parsedState.profile);
        form.reset(parsedState.profile);
      }
    } catch (error) {
      console.error("Failed to load profile from localStorage", error);
    }
  }, [form]);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("avatarUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      const storedState = localStorage.getItem("mindbloom_state");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        
        const shouldReAnalyze = parsedState.profile.profession !== values.profession;
        
        parsedState.profile = values;
        localStorage.setItem("mindbloom_state", JSON.stringify(parsedState));
        
        // This is a bit of a hack to trigger the storage event listener in the layout
        window.dispatchEvent(new Event('storage'));

        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });

        if (shouldReAnalyze) {
             toast({
                title: "Profession Changed",
                description: "You may want to retake the survey to get a more accurate analysis.",
            });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error updating your profile.",
      });
    }
  }

  const avatarUrl = form.watch("avatarUrl");
  const name = form.watch("name") || profile?.name || "";

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <h1 className="text-3xl font-bold font-headline">Profile</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            <CardTitle>Your Information</CardTitle>
          </div>
          <CardDescription>
            Update your personal information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profile ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="avatarUrl"
                  render={() => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
                          <AvatarFallback className="text-3xl">
                            {name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                           <Upload className="mr-2 h-4 w-4" />
                           Upload Image
                        </Button>
                        <FormControl>
                            <Input 
                                type="file" 
                                className="hidden" 
                                ref={fileInputRef} 
                                onChange={handleAvatarUpload}
                                accept="image/png, image/jpeg, image/gif"
                            />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
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
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                </div>
                
                <Button type="submit">Save Changes</Button>
              </form>
            </Form>
          ) : (
            <p>Loading profile...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
