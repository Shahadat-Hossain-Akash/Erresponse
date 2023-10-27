"use client";
import { Button, CardFooter, CardHeader, Table } from "@nextui-org/react";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Issue } from "@prisma/client";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import IssueStatusChip from "./IssueStatusChip";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { AiOutlineUser } from "react-icons/ai";

const LatestIssue = ({ issues }: any) => {
  return (
    <div className="w-full gap-4 flex flex-col ">
      {issues.map((issue: any) => (
        <Card
          fullWidth
          shadow="none"
          className=" text-secondary flex flex-col gap-2 hover:bg-orange-50/20 cursor-pointer bg-background/80 dark:bg-background/20 backdrop-blur-md backdrop-saturate-150 transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent"
          isBlurred
          isFooterBlurred
          key={issue.id}
        >
          <CardHeader>
            <h4 className="text-orange-400/70 font-medium text-xl">
              {issue?.title}
            </h4>
          </CardHeader>

          <CardFooter className=" bg-zinc-300/20 bottom-0 z-10 rounded-large">
            <div className="flex flex-grow gap-2 items-center flex-wrap">
              <div className="flex flex-col">
                <p className="text-tiny text-left text-secondary">
                  {issue?.description}
                </p>
              </div>
              <IssueStatusChip status={issue.status} />
            </div>
            <div className="flex-col sm:flex-row flex gap-1 items-center ">
              {issue.assignToUser && (
                <>
                  <Avatar
                    size="sm"
                    fallback={<AiOutlineUser />}
                    src={issue?.assignToUser?.image!}
                    classNames={{
                      base: "bg-gradient-to-br from-[#FFB457] to-[#EA712E]",
                    }}
                  />
                </>
              )}
              <Button
                variant="light"
                isIconOnly
                className="rounded-full"
                color="primary"
              >
                <Link href={`/issues/${issue.id}`}>
                  <BsArrowUpRight />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LatestIssue;
