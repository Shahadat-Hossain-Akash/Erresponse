import React, { Suspense } from "react";

import prisma from "@/prisma/client";
import IssueTable from "@/components/IssueTable";
import LoadingIssuePage from "./loading";
import IssueActions from "./IssueActions";

const IssuePage = async () => {
  const data = await prisma.issue.findMany();
  return (
    <div className="flex flex-col font-quicksand space-y-4 w-full">
      <IssueActions />
      <Suspense fallback={<LoadingIssuePage />}>
        <IssueTable data={data} />
      </Suspense>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
