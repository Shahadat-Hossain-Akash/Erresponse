import IssueButton from "@/components/IssueButton";
import Link from "next/link";
import React from "react";

const IssueActions = () => {
  return (
    <Link href={"/issues/new"}>
      <IssueButton />
    </Link>
  );
};

export default IssueActions;
