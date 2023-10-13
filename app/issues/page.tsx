import React from "react";

import Link from "next/link";
import IssueButton from "@/components/IssueButton";

const IssuePage = () => {
  return (
    <div className="flex flex-col  font-quicksand">
      <Link href={"/issues/new"}>
        <IssueButton />
      </Link>
    </div>
  );
};

export default IssuePage;
