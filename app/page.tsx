import LatestIssue from "../components/LatestIssue";
import prisma from "@/prisma/client";
import IssueSummary from "@/components/IssueSummary";
import IssueCharts from "@/components/IssueCharts";
import { cache } from "react";
import { Status } from "@prisma/client";

const fetchCount = async (type: Status) => {
  return await prisma.issue.count({ where: { status: type } });
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      assignToUser: true,
    },
  });

  const open = await fetchCount("OPEN");
  const inProgress = await fetchCount("IN_PROGRESS");
  const closed = await fetchCount("CLOSED");

  return (
    <div className="flex gap-4 flex-col font-quicksand min-h-screen text-zinc-500 w-full mb-10">
      <div className="text-3xl sm:text-6xl font-semibold text-orange-400">
        Latest Issues
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-500 w-full mb-10 ">
        <div className="order-first md:order-last flex flex-col w-full gap-4">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <LatestIssue issues={issues} />
        </div>
        <IssueCharts open={open} inProgress={inProgress} closed={closed} />
      </div>
    </div>
  );
}
