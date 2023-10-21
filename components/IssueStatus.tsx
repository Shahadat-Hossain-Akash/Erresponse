"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const statusOptions = [
  { key: "OPEN", label: "Open" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "CLOSED", label: "Closed" },
];

const IssueStatus = ({ status }: any) => {
  const [selectedStatus, setSelectedStatus] = React.useState(status || "OPEN");

  const handleStatusChange = (status: any) => {
    setSelectedStatus(status);
  };

  const selectedValue = React.useMemo(() => {
    const selectedStatusOption = statusOptions.find(
      (option) => option.key === selectedStatus
    );
    return selectedStatusOption ? selectedStatusOption.label : "";
  }, [selectedStatus]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat" color="secondary" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Status selection"
        color="warning"
        variant="flat"
      >
        {statusOptions
          .filter((option) => option.key !== status)
          .map((option) => (
            <DropdownItem
              className="text-zinc-500"
              key={option.key}
              onClick={() => handleStatusChange(option.key)}
            >
              {option.label}
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default IssueStatus;
