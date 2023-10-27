"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssueActions from "./IssueActions";

export default function LoadingIssuePage() {
  const data = [1, 2, 3];
  return (
    <div className="flex flex-col font-quicksand space-y-4 w-full">
      <IssueActions />
      <Table
        isHeaderSticky
        bottomContentPlacement="outside"
        selectionMode="multiple"
        topContentPlacement="outside"
        color="warning"
        shadow="none"
      >
        <TableHeader className="shadow-none">
          <TableColumn className="text-medium">Issue</TableColumn>
          <TableColumn className=" text-medium hidden md:table-cell ">
            Status
          </TableColumn>
          <TableColumn className="text-medium">Created at</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((issue: any) => (
            <TableRow key={issue.title}>
              <TableCell className="text-slate-500">
                <Skeleton />
                <div className="block mt-1 md:hidden">
                  <Skeleton />
                </div>
              </TableCell>
              <TableCell className="text-slate-500 hidden md:table-cell">
                <Skeleton />
              </TableCell>
              <TableCell className="text-slate-500">
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
