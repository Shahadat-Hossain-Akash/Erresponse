import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React, { Suspense, cache } from "react";
import Dynamic from "next/dynamic";
import LoadingIssueDetails from "./loading";

const LazyIssueDetails = Dynamic(() => import("@/components/IssueDetails"));
interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);
const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession();

  const validate = parseInt(params.id);
  if (typeof validate !== "number") notFound();

  const issue = await fetchIssue(validate);

  if (!issue) notFound();

  return (
    <Suspense fallback={<LoadingIssueDetails />}>
      <LazyIssueDetails issue={issue} session={session} />
    </Suspense>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export const dynamic = "force-dynamic";

export default IssueDetailsPage;
