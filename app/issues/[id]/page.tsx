import IssueDetails from "@/components/IssueDetails";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const validate = parseInt(params.id);
  if (typeof validate !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: validate },
  });

  if (!issue) notFound();

  return <IssueDetails issue={issue} />;
};

export default IssueDetailsPage;
