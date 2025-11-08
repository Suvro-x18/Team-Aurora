
"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Gamepad2, CheckSquare, Search, PenLine } from "lucide-react";

const games = [
  {
    href: "/dashboard/game/bubble-pop",
    title: "Bubble Pop",
    description: "A simple, satisfying game of popping virtual bubble wrap.",
    Icon: CheckSquare,
  },
  {
    href: "/dashboard/game/word-search",
    title: "Word Search",
    description: "Find the hidden words in the grid to relax your mind.",
    Icon: Search,
  },
  {
    href: "/dashboard/game/connect-the-dots",
    title: "Connect the Dots",
    description: "Connect the dots to reveal a hidden shape.",
    Icon: PenLine,
  },
];

export default function GameLobbyPage() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-2">
        <Gamepad2 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Anti-Stress Games</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link href={game.href} key={game.href} className="block">
            <Card className="h-full hover:bg-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <game.Icon className="h-8 w-8 text-primary" />
                  <CardTitle>{game.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{game.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
