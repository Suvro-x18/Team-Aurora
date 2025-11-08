"use client";
"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername("User");
  }, []);

  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome, {username}</h1>
    </main>
  );
}

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LoginPage() {
  const router = useRouter();
  const loginBg = PlaceHolderImages.find(img => img.id === 'login-background');

  const handleSignIn = () => {
    router.push("/survey");
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {loginBg && (
        <Image
          src={loginBg.imageUrl}
          alt={loginBg.description}
          data-ai-hint={loginBg.imageHint}
          fill
          className="object-cover -z-10 brightness-75"
        />
      )}
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Logo className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-headline">MindBloom</CardTitle>
          </div>
          <CardDescription>
            Your personal guide to mental wellness.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleSignIn}>
            Sign In
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="underline hover:text-primary">
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
