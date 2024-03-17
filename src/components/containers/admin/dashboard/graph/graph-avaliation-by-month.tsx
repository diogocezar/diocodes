"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Document } from "mongodb";

type GraphAvaliationByMonthProps = {
  data: Document[];
};

function getMonth(month: string) {
  const monthNumber = parseInt(month, 10);
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const result = months[monthNumber - 1];
  return result;
}

const CustomTooltip = ({ payload }: any) => {
  if (payload && payload.length) {
    return (
      <div className="bg-card text-foreground rounded-sm p-2">
        <p>Média do mês: {payload[0].payload?.total}</p>
      </div>
    );
  }
  return null;
};

export function GraphAvaliationByMonth({ data }: GraphAvaliationByMonthProps) {
  const transformedData = data?.map((item) => {
    return {
      name: getMonth(item._id),
      total: item.avgRating,
    };
  });
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={transformedData}>
        <XAxis
          dataKey="name"
          stroke="var(--foreground)"
          fontSize={12}
          tickLine={true}
          axisLine={true}
        />
        <YAxis
          stroke="var(--foreground)"
          fontSize={12}
          tickLine={true}
          axisLine={true}
        />
        <Bar dataKey="total" fill="var(--green)" radius={[8, 8, 0, 0]} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}
