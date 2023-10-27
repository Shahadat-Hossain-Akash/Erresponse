"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const IssueFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  return (
    <div className="flex flex-wrap md:flex-nowrap w-unit-6xl gap-4 ">
      <Select
        items={statuses}
        size="sm"
        label="Filter Issue by status"
        className="max-w-xs text-orange-500"
        color="primary"
        shouldFlip
        radius="lg"
        variant="underlined"
        onSelectionChange={(status: any) => {
          const params = new URLSearchParams();
          if (status)
            params.append(
              status["currentKey"] !== "" ? "status" : "",
              status["currentKey"]
            );
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);
          {
            /*const query =
            status["currentKey"] !== ""
              ? `?status=${status["currentKey"]}`
        : "";*/
          }
          const query =
            params.has("status") || params.has("orderBy")
              ? "?" + params.toString()
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

export default IssueFilter;
