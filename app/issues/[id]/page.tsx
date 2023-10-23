import authOptions from "@/app/auth/authOptions";
import IssueDetails from "@/components/IssueDetails";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession();

  const validate = parseInt(params.id);
  if (typeof validate !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: validate },
  });

  if (!issue) notFound();

  return <IssueDetails issue={issue} session={session} />;
};

export default IssueDetailsPage;
