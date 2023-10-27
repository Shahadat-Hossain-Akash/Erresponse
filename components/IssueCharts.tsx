"use client";
import { Card } from "@nextui-org/react";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueCharts = ({ open, inProgress, closed }: Props) => {
  const data: {
    label: string;
    value: number;
  }[] = [
    {
      label: "Open",
      value: open,
    },
    {
      label: "In Progress",
      value: inProgress,
    },
    {
      label: "Closed",
      value: closed,
    },
  ];
  const datas = [
    {
      open: open,
      label: "Open",
    },
    {
      inProgress: inProgress,
      label: "In Progress",
    },
    {
      closed: closed,
      label: "Closed",
    },
  ];

  return (
    <Card
      shadow="lg"
      className="pt-8 max-w-[992px] w-full max-h-[50vh] pr-16 bg-transparent"
    >
      <ResponsiveContainer>
        <BarChart data={datas}>
          <XAxis
            dataKey={"label"}
            axisLine={{ stroke: "#EA712E" }}
            tick={{ stroke: "#EA712E" }}
            tickLine={{ stroke: "#EA712E" }}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#EA712E" }}
            tickLine={{ stroke: "#EA712E" }}
          />
          <CartesianGrid strokeDasharray="5 5" />
          <Bar dataKey="open" fill="#FCAD81" />
          <Bar dataKey="inProgress" fill="#FCAD81" />
          <Bar dataKey="closed" fill="#FCAD81" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueCharts;
