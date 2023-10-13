"use client";

import React from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  return (
    <div className="flex space-y-4 flex-col w-8/12">
      <TextField.Root
        radius="small"
        size={"3"}
        color="lime"
        variant="soft"
        className="flex"
      >
        <TextField.Input placeholder="Title…" />
      </TextField.Root>
      <SimpleMDE color="lime" placeholder="Write your issue" />
      <Button className="flex w-3/6">Submit new issue</Button>
    </div>
  );
};

export default NewIssue;
