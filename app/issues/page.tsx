import React, { Suspense } from "react";

import Link from "next/link";
import IssueButton from "@/components/IssueButton";
import prisma from "@/prisma/client";
import IssueTable from "@/components/IssueTable";
import LoadingIssuePage from "./loading";
import delay from "delay";
import IssueActions from "./IssueActions";

const IssuePage = async () => {
  const data = await prisma.issue.findMany();
  await delay(1500);
  return (
    <div className="flex flex-col font-quicksand space-y-4 w-full">
      <IssueActions />
      <Suspense fallback={<LoadingIssuePage />}>
        <IssueTable data={data} />
      </Suspense>
    </div>
  );
};

export default IssuePage;
