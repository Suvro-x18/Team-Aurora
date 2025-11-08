
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, RefreshCw } from "lucide-react";

const BUBBLE_COUNT = 100;
const ROW_COLORS = [
    "bg-red-500/80",
    "bg-orange-500/80",
    "bg-yellow-500/80",
    "bg-green-500/80",
    "bg-teal-500/80",
    "bg-cyan-500/80",
    "bg-blue-500/80",
    "bg-indigo-500/80",
    "bg-purple-500/80",
    "bg-pink-500/80",
];

const Bubble = ({
  isPopped,
  onPop,
  color,
}: {
  isPopped: boolean;
  onPop: () => void;
  color: string;
}) => {
  return (
    <motion.button
      onClick={onPop}
      className={`relative h-12 w-12 rounded-full transition-all duration-200 focus:outline-none ${
        isPopped ? "bg-primary/20" : `${color} shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),_0_4px_6px_rgba(0,0,0,0.1)]`
      }`}
      whileTap={{ scale: isPopped ? 1 : 0.9 }}
      aria-label={isPopped ? "Popped bubble" : "Bubble to pop"}
      disabled={isPopped}
    >
      <span
        className={`absolute inset-0 rounded-full ${isPopped ? "" : "bg-gradient-to-br from-white/20 to-transparent"}`}
      />
    </motion.button>
  );
};

export default function BubblePopPage() {
  const [poppedBubbles, setPoppedBubbles] = useState(
    new Array(BUBBLE_COUNT).fill(false)
  );
  
  const handlePop = (index: number) => {
    const newPoppedBubbles = [...poppedBubbles];
    newPoppedBubbles[index] = true;
    setPoppedBubbles(newPoppedBubbles);
  };

  const handleReset = () => {
    setPoppedBubbles(new Array(BUBBLE_COUNT).fill(false));
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Bubble Pop</h1>
        <Button onClick={handleReset} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            <CardTitle>Pop 'em all!</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-4 justify-center">
            {poppedBubbles.map((isPopped, index) => {
              const row = Math.floor(index / 10);
              const color = ROW_COLORS[row % ROW_COLORS.length];
              return (
                <Bubble
                  key={index}
                  isPopped={isPopped}
                  onPop={() => handlePop(index)}
                  color={color}
                />
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
