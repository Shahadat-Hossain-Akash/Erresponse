import React, { Suspense } from "react";
import LoadingNewIssue from "./loading";
import dynamic from "next/dynamic";

const LazyIssueForm = dynamic(() => import("../_components/IssueForm"));

const NewIssuePage = () => {
  return (
    <div className="flex w-full">
      <Suspense fallback={<LoadingNewIssue />}>
        <LazyIssueForm />
      </Suspense>
    </div>
  );
};

export default NewIssuePage;
