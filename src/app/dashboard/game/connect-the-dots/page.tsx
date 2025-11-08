
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, PenLine, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const puzzles = [
  {
    name: "Star",
    dots: [
      { x: 50, y: 5 }, { x: 61, y: 40 }, { x: 98, y: 40 },
      { x: 68, y: 62 }, { x: 79, y: 95 }, { x: 50, y: 75 },
      { x: 21, y: 95 }, { x: 32, y: 62 }, { x: 2, y: 40 },
      { x: 39, y: 40 },
    ],
  },
  {
    name: "House",
    dots: [
      { x: 50, y: 5 }, { x: 95, y: 40 }, { x: 95, y: 95 },
      { x: 5, y: 95 }, { x: 5, y: 40 },
    ]
  },
  {
      name: "Cat Face",
      dots: [
        { x: 20, y: 20 }, { x: 80, y: 20 }, 
        { x: 90, y: 50 }, { x: 80, y: 80 },
        { x: 20, y: 80 }, { x: 10, y: 50 },
      ]
  },
  {
      name: "Boat",
      dots: [
        { x: 20, y: 80 }, { x: 80, y: 80 }, { x: 70, y: 60 },
        { x: 30, y: 60 }, { x: 20, y: 80 }, { x: 50, y: 60 },
        { x: 50, y: 20 }, { x: 70, y: 40 }
      ]
  }
];

export default function ConnectTheDotsPage() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [connectedDots, setConnectedDots] = useState<number[]>([]);

  const currentPuzzle = useMemo(() => puzzles[puzzleIndex], [puzzleIndex]);
  
  // A puzzle is complete if all its primary dots are connected.
  // For puzzles that close a loop, we add one more connection.
  const isComplete = useMemo(() => {
    if (!currentPuzzle) return false;
    const requiredDots = currentPuzzle.dots.length;
    return connectedDots.length >= requiredDots;
  },[connectedDots, currentPuzzle]);


  const handleDotClick = (index: number) => {
    if (isComplete) return;

    if (index === connectedDots.length) {
      setConnectedDots((prev) => [...prev, index]);
    }
  };

  const resetGame = () => {
    setConnectedDots([]);
  };

  const handleNewGame = () => {
    setPuzzleIndex((prev) => (prev + 1) % puzzles.length);
    resetGame();
  };

  const lines = useMemo(() => {
    const drawnLines = [];
    const loopClosed = currentPuzzle.name === 'Star' || currentPuzzle.name === 'House' || currentPuzzle.name === 'Cat Face';

    for (let i = 0; i < connectedDots.length -1; i++) {
        const fromDot = currentPuzzle.dots[connectedDots[i]];
        const toDot = currentPuzzle.dots[connectedDots[i + 1]];
        drawnLines.push({
            key: `line-${i}`,
            x1: `${fromDot.x}%`, y1: `${fromDot.y}%`,
            x2: `${toDot.x}%`, y2: `${toDot.y}%`,
        });
    }

    if (isComplete && loopClosed) {
        const fromDot = currentPuzzle.dots[connectedDots[connectedDots.length -1]];
        const toDot = currentPuzzle.dots[connectedDots[0]];
         drawnLines.push({
            key: `line-closing`,
            x1: `${fromDot.x}%`, y1: `${fromDot.y}%`,
            x2: `${toDot.x}%`, y2: `${toDot.y}%`,
        });
    }
    
    return drawnLines;
  }, [connectedDots, currentPuzzle, isComplete]);
  
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Connect the Dots</h1>
        <div className="flex gap-2">
          <Button onClick={resetGame} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleNewGame} variant="default" size="sm">
            New Puzzle
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PenLine className="h-6 w-6 text-primary" />
            <CardTitle>Reveal the Picture</CardTitle>
          </div>
          <CardDescription>Click the dots in numerical order to reveal the hidden shape.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-96">
          <div className="relative w-[400px] h-[300px]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {lines.map((line) => (
                <motion.line
                  key={line.key}
                  x1={line.x1} y1={line.y1}
                  x2={line.x2} y2={line.y2}
                  stroke="hsl(var(--foreground))"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </svg>

            {currentPuzzle.dots.map((dot, index) => (
              <button
                key={index}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none",
                   connectedDots.includes(index) ? "bg-primary text-primary-foreground h-8 w-8" : "bg-muted text-muted-foreground h-8 w-8 hover:bg-primary/20",
                   index === connectedDots.length && !isComplete && "animate-pulse ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                onClick={() => handleDotClick(index)}
              >
                <span className="text-sm font-bold">{index + 1}</span>
              </button>
            ))}
             <AnimatePresence>
              {isComplete && (
                <motion.div 
                    className="absolute inset-0 flex flex-col items-center justify-center bg-background/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <Star className="h-8 w-8" />
                        <span>Well Done!</span>
                    </div>
                    <p className="text-muted-foreground">You revealed the {currentPuzzle.name}!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
