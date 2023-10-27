import React, { Suspense } from "react";

import prisma from "@/prisma/client";
import IssueTable from "@/components/IssueTable";
import LoadingIssuePage from "./loading";
import IssueActions from "./IssueActions";
import IssueFilter from "@/components/IssueFilter";
import { Status } from "@prisma/client";
import { Metadata } from "next";

interface Props {
  searchParams: { status: Status; orderBy: any; page: string };
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns = ["title", "createdAt", "status"];
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columns.map((column) => column).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "desc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const data = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div className="flex flex-col font-quicksand space-y-4 w-full ">
      <IssueActions />
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <IssueFilter />
      </div>
      <Suspense fallback={<LoadingIssuePage />}>
        <IssueTable
          data={data}
          page={page}
          issueCount={issueCount}
          pageSize={pageSize}
        />
      </Suspense>
    </div>
  );
};

//export const dynamic = "force-dynamic";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Erresponse - An Issue tracker",
  description: "View lists of issue data",
};

export default IssuePage;
