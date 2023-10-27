import { Suspense } from "react";

import Spinner from "@/components/Spinner";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import LoadingIssuePage from "./loading";

const LazyIssueTable = dynamic(() => import("@/components/IssueTable"));
const LazyIssueFilter = dynamic(() => import("@/components/IssueFilter"));
const LazyIssueAction = dynamic(() => import("./IssueActions"));

interface Props {
  searchParams: { status: Status; orderBy: any; page: string };
}

const fetchData = async (
  where: { status: Status | undefined },
  orderBy: { [x: number]: string } | undefined,
  page: number,
  pageSize: number
) => {
  const dataPromise = prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCountPromise = prisma.issue.count({ where });

  const [data, issueCount] = await Promise.all([
    dataPromise,
    issueCountPromise,
  ]);
  return { data, issueCount };
};

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

  const { data, issueCount } = await fetchData(where, orderBy, page, pageSize);

  return (
    <div className="flex flex-col font-quicksand space-y-4 w-full ">
      <Suspense fallback={<Spinner />}>
        <LazyIssueAction />
      </Suspense>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <Suspense fallback={<Spinner />}>
          <LazyIssueFilter />
        </Suspense>
      </div>
      <Suspense fallback={<LoadingIssuePage />}>
        <LazyIssueTable
          data={data}
          page={page}
          issueCount={issueCount}
          pageSize={pageSize}
        />
      </Suspense>
    </div>
  );
};

export const revalidate = 5;

export const metadata: Metadata = {
  title: "Erresponse - An Issue tracker",
  description: "View lists of issue data",
};

export default IssuePage;
