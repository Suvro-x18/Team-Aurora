
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("username");
      if (storedName) setUsername(storedName);
    }
  }, []);

  return <div>Welcome, {username || "Guest"}!</div>;
}
  const loginBg = PlaceHolderImages.find(img => img.id === 'login-background');

  const handleSignIn = () => {
    router.push("/survey");
  };

  if (!isClient) {
    // Render a skeleton or loading state on the server and during initial client render
    // to prevent hydration mismatch errors.
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
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
                    <Skeleton className="h-4 w-48 mx-auto" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                </CardFooter>
            </Card>
        </div>
    );
  }

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
      <Card className="w-full max-w-sm animate-in fade-in-50 duration-500">
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
