"use client";

import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import { Status } from "@prisma/client";
import { BsArrowDownUp } from "react-icons/bs";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {statuses.map((status) => (
        <Card
          key={status.status}
          className="max-w-lg min-w-screen w-full drop-shadow-[5px_5px_3px_rgba(0,0,0,0.05)] hover:shadow-md"
        >
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md text-primary/80">Status</p>
              <div className="text-small text-secondary/70">
                <Chip
                  radius="sm"
                  color={
                    status.status === "OPEN"
                      ? "secondary"
                      : status.status === "IN_PROGRESS"
                      ? "success"
                      : "danger"
                  }
                  variant="flat"
                >
                  {status.status}
                </Chip>
              </div>
            </div>
          </CardHeader>
          <Divider className="bg-orange-400" />
          <CardBody className="flex flex-row items-center gap-2 w-full">
            <p className="text-orange-400 text-6xl font-bold">
              {status.value ?? 0}
            </p>
            <BsArrowDownUp size={20} className="text-orange-400" />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default IssueSummary;
