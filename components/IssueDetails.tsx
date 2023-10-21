"use client";
import React from "react";
import IssueStatusChip from "./IssueStatusChip";
import { Code } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import DeleteIssueButton from "./DeleteIssueButton";

const IssueDetails = ({ issue }: any) => {
  return (
    <div className="text-slate-700 flex w-full flex-col gap-y-4">
      <div className="flex w-full items-end justify-between">
        <div className="flex items-center sm:items-end gap-x-4">
          <h1 className="text-3xl sm:text-6xl align-text-top font-semibold subpixel-antialiased">
            {issue.title}
          </h1>
          <Link href={`/issues/${issue.id}/edit`}>
            <Button
              className=" mb-1"
              variant="light"
              isIconOnly
              color="warning"
              aria-label="Edit"
            >
              <CiEdit size={"28"} />
            </Button>
          </Link>
        </div>
        <DeleteIssueButton issueId={issue.id} />
      </div>
      <div className="flex gap-2 items-center">
        <IssueStatusChip status={issue.status} />
        <Code color="danger" className="w-fit">
          {issue.createdAt.toDateString()}
        </Code>
      </div>
      <p className="text-2xl bg-neutral-200 p-3 rounded-2xl text-zinc-700">
        {issue.description}
      </p>
    </div>
  );
};

export default IssueDetails;
