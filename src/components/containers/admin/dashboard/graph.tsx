"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Fev",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Abr",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Mai",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Ago",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Set",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Out",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 4),
  },
  {
    name: "Dez",
    total: Math.floor(Math.random() * 4),
  },
];

export function Graph() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
