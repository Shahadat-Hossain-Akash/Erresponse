"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

const IssueSort = () => {
  const router = useRouter();

  const statuses: { label: string; value?: string }[] = [
    { label: "Ascending" },
    { label: "Descending", value: "dsc" },
    { label: "Date", value: "created_at" },
  ];

  return (
    <div className="flex flex-wrap md:flex-nowrap w-unit-4xl gap-4 ">
      <Select
        items={statuses}
        size="sm"
        label="Sort"
        className="max-w-xs text-orange-500"
        color="primary"
        shouldFlip
        radius="lg"
        variant="underlined"
        onSelectionChange={(status: any) => {
          const query =
            status["currentKey"] !== ""
              ? `?status=${status["currentKey"]}`
              : "";
          router.push(`/issues` + query);
        }}
      >
        {statuses.map((status) => (
          <SelectItem
            className="text-orange-400"
            color="secondary"
            variant="flat"
            key={status.value || ""}
            value={status.value || ""}
          >
            {status.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default IssueSort;
