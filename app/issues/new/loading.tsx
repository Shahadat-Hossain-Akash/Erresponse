"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LoadingNewIssue = () => {
  return (
    <div className="flex w-full">
      <Skeleton
        count={3}
        width={"20rem"}
        height={"2.5rem"}
        borderRadius={"1rem"}
      />
    </div>
  );
};

export default LoadingNewIssue;
