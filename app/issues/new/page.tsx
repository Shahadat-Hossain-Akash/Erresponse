import NewIssue from "@/components/NewIssue";
import delay from "delay";
import React from "react";
import IssueForm from "../_components/IssueForm";

const NewIssuePage = async () => {
  await delay(3000);
  return (
    <div className="flex w-full">
      <IssueForm />
    </div>
  );
};

export default NewIssuePage;
