"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import IssueStatusChip from "./IssueStatusChip";

const IssueTable = ({ data }: any) => {
  return (
    <div className="flex ">
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
            <TableRow key={issue.id}>
              <TableCell className="text-slate-500">
                {issue.title}
                <div className="block mt-1 md:hidden">
                  {<IssueStatusChip status={issue.status} />}
                </div>
              </TableCell>
              <TableCell className="text-slate-500 hidden md:table-cell">
                <IssueStatusChip status={issue.status} />
              </TableCell>
              <TableCell className="text-slate-500">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssueTable;
