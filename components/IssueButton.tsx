"use client";
import React from "react";
import { Button } from "@nextui-org/react";

const IssueButton = () => {
  return (
    <Button
      radius="sm"
      className=" text-black"
      color="primary"
      variant="shadow"
    >
      Create an issue
    </Button>
  );
};

export default IssueButton;
