import IssueDetails from "@/components/IssueDetails";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React, { cache } from "react";

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

  const issue = await fetchIssue(parseInt(params?.id));

  if (!issue) notFound();

  return <IssueDetails issue={issue} session={session} />;
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailsPage;
