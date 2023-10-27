import React, { Suspense } from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import LoadingNewIssue from "../../new/loading";

const LazyIssueForm = dynamic(() => import("../../_components/IssueForm"));

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <Suspense fallback={<LoadingNewIssue />}>
      <LazyIssueForm issue={issue} />
    </Suspense>
  );
};

export default EditIssuePage;
