"use client";
import React from "react";
import { Button } from "@nextui-org/react";

const IssueButton = () => {
  return (
    <div className="w-fit">
      <Button
        radius="sm"
        className=" text-white"
        color="primary"
        variant="shadow"
      >
        Create an issue
      </Button>
    </div>
  );
};

export default IssueButton;
