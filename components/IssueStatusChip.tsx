import { Chip } from "@nextui-org/react";
import { Status } from "@prisma/client";
import React from "react";

const statusMap: Record<
  Status,
  {
    label: string;
    color: "secondary" | "warning" | "success";
  }
> = {
  OPEN: {
    label: "Open",
    color: "secondary",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "warning",
  },
  CLOSED: {
    label: "Closed",
    color: "success",
  },
};

const IssueStatusChip = ({ status }: { status: Status }) => {
  return (
    <Chip variant="flat" color={statusMap[status]?.color}>
      {statusMap[status]?.label}
    </Chip>
  );
};

export default IssueStatusChip;
