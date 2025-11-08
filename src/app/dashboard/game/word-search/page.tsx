
"use client";

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper function to generate a word search grid
const generateGrid = (words: string[], gridSize: number) => {
  const grid: (string | null)[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
  const placedWords: { word: string, positions: { x: number, y: number }[] }[] = [];

  const directions = [
    { x: 1, y: 0 }, // Horizontal
    { x: 0, y: 1 }, // Vertical
    { x: 1, y: 1 }, // Diagonal down-right
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const placeWord = (word: string) => {
    word = word.toUpperCase();
    const shuffledDirections = [...directions].sort(() => Math.random() - 0.5);

    for (const dir of shuffledDirections) {
      const startX = Math.floor(Math.random() * gridSize);
      const startY = Math.floor(Math.random() * gridSize);

      for (let i = 0; i < gridSize * gridSize; i++) {
        const x = (startX + i) % gridSize;
        const y = (startY + Math.floor(i / gridSize)) % gridSize;
        let canPlace = true;
        const positions = [];

        for (let j = 0; j < word.length; j++) {
          const newX = x + j * dir.x;
          const newY = y + j * dir.y;

          if (newX >= gridSize || newY >= gridSize || (grid[newY][newX] && grid[newY][newX] !== word[j])) {
            canPlace = false;
            break;
          }
        }
        
        if (canPlace) {
          for (let j = 0; j < word.length; j++) {
            const newX = x + j * dir.x;
            const newY = y + j * dir.y;
            grid[newY][newX] = word[j];
            positions.push({ x: newX, y: newY });
          }
          placedWords.push({ word, positions });
          return true;
        }
      }
    }
    return false;
  };
  
  words.forEach(placeWord);

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === null) {
        grid[y][x] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return { grid: grid as string[][], words: placedWords };
};

const wordLists = [
  ['RELAX', 'CALM', 'PEACE', 'BREEZE', 'QUIET'],
  ['SMILE', 'HAPPY', 'JOY', 'FUN', 'LAUGH'],
  ['FOCUS', 'BREATHE', 'EASE', 'FLOW', 'ZEN'],
];

const GRID_SIZE = 10;

export default function WordSearchPage() {
  const [listIndex, setListIndex] = useState(0);
  const [game, setGame] = useState(() => generateGrid(wordLists[listIndex], GRID_SIZE));
  const [selectedCells, setSelectedCells] = useState<{ x: number, y: number }[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const resetGame = useCallback(() => {
    setGame(generateGrid(wordLists[listIndex], GRID_SIZE));
    setSelectedCells([]);
    setFoundWords([]);
  }, [listIndex]);

  const handleNewGame = () => {
    const newIndex = (listIndex + 1) % wordLists.length;
    setListIndex(newIndex);
  };
  
  useMemo(() => {
    resetGame();
  }, [listIndex, resetGame])


  const handleCellEnter = (x: number, y: number) => {
    if (isSelecting) {
      if (!selectedCells.some(cell => cell.x === x && cell.y === y)) {
         setSelectedCells(prev => [...prev, { x, y }]);
      }
    }
  };

  const handleMouseUp = () => {
    checkSelection(selectedCells);
    setIsSelecting(false);
    setSelectedCells([]);
  };

  const checkSelection = (selection: { x: number, y: number }[]) => {
    if (selection.length < 2) return;
    
    // Sort selection to handle different drag directions
    const sortedSelection = [...selection].sort((a, b) => a.y - b.y || a.x - b.x);
    const selectedWord = sortedSelection.map(({ x, y }) => game.grid[y][x]).join('');

    for (const placedWord of game.words) {
      if (foundWords.includes(placedWord.word)) continue;
      
      const forwardMatch = selectedWord === placedWord.word;
      const reverseMatch = selectedWord === [...placedWord.word].reverse().join('');

      if (forwardMatch || reverseMatch) {
         setFoundWords(prev => [...prev, placedWord.word]);
         return;
      }
    }
  };
  
  const isCellSelected = (x: number, y: number) => 
    selectedCells.some(cell => cell.x === x && cell.y === y);

  const isCellFound = (x: number, y: number) =>
    game.words.some(wordData =>
      foundWords.includes(wordData.word) &&
      wordData.positions.some(pos => pos.x === x && pos.y === y)
    );

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Word Search</h1>
        <div className="flex gap-2">
            <Button onClick={resetGame} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
            </Button>
            <Button onClick={handleNewGame} variant="default" size="sm">
                New Game
            </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <Search className="h-6 w-6 text-primary" />
                <CardTitle>Find the Words</CardTitle>
            </div>
          <CardDescription>Click and drag to select the hidden words.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div 
            className="grid gap-1 bg-muted/30 p-2 rounded-lg"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
            onMouseLeave={() => {
              if (isSelecting) {
                handleMouseUp();
              }
            }}
            onMouseUp={handleMouseUp}
          >
            {game.grid.map((row, y) =>
              row.map((letter, x) => (
                <motion.div
                  key={`${x}-${y}`}
                  className={cn(
                    "flex h-8 w-10 items-center justify-center rounded-md font-mono text-lg font-bold select-none cursor-pointer transition-colors duration-200",
                    isCellFound(x, y) ? 'bg-primary text-primary-foreground' : 'bg-background',
                    isCellSelected(x, y) && 'bg-primary/50'
                  )}
                  onMouseDown={() => { 
                    setIsSelecting(true);
                    setSelectedCells([{x,y}]);
                  }}
                  onMouseEnter={() => handleCellEnter(x, y)}
                >
                  {letter}
                </motion.div>
              ))
            )}
          </div>
          <div className="w-full lg:w-48">
             <CardTitle className="mb-4 text-xl">Word List</CardTitle>
             <ul className="space-y-2">
                {wordLists[listIndex].map((word) => (
                    <li key={word} className={cn(
                        "text-lg font-medium transition-colors",
                        foundWords.includes(word.toUpperCase()) ? 'text-muted-foreground line-through' : 'text-foreground'
                    )}>
                        {word}
                    </li>
                ))}
             </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
