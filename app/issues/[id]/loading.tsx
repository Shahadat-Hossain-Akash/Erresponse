"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetails = () => {
  return (
    <div className="text-slate-700 flex w-full flex-col gap-y-4">
      <h1 className="text-6xl font-semibold subpixel-antialiased">
        <Skeleton width={"20rem"} />
      </h1>
      <div className="flex gap-2">
        <Skeleton width={"15rem"} />
      </div>
      <p className="text-2xl rounded-2xl">
        <Skeleton count={2} />
      </p>
    </div>
  );
};

export default LoadingIssueDetails;
