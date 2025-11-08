
"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { HistoricalScore } from "@/lib/types";

const chartConfig = {
  score: {
    label: "Wellness Score",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface WeeklyMoodChartProps {
  historicalScores: HistoricalScore[];
}

export function WeeklyMoodChart({ historicalScores = [] }: WeeklyMoodChartProps) {
  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) =>
      startOfDay(subDays(new Date(), i))
    ).reverse();

    return last7Days.map((day) => {
      const entry = historicalScores.find(
        (score) => startOfDay(new Date(score.date)).getTime() === day.getTime()
      );
      return {
        date: format(day, "MMM d"),
        score: entry ? entry.score : null,
      };
    });
  }, [historicalScores]);

  return (
    <ChartContainer config={chartConfig} className="w-full h-64">
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            cursor={true}
            content={
              <ChartTooltipContent
                labelFormatter={(label, payload) => {
                  return payload[0]?.payload.date || label;
                }}
                formatter={(value) => (value ? [`${value}%`, "Wellness Score"] : [null, null])}
                indicator="dot"
              />
            }
          />
          <Area
            dataKey="score"
            type="monotone"
            fill="var(--color-score)"
            fillOpacity={0.4}
            stroke="var(--color-score)"
            strokeWidth={2}
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
