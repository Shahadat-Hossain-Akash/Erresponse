"use client";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { default as Link, default as NextLink } from "next/link";
import { useSearchParams } from "next/navigation";
import { CgArrowTopRight } from "react-icons/cg";
import IssueStatusChip from "./IssueStatusChip";
import Pagination from "./Pagination";

const IssueTable = ({ data, page, issueCount, pageSize }: any) => {
  let params = useSearchParams();
  let search = params.get("status");

  const columns: { label: string; value: string; className?: string }[] = [
    { label: "Issue", value: "title" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell text-medium text-zinc-500",
    },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell text-medium text-zinc-500",
    },
    {
      label: "Details",
      value: "id",
    },
    {
      label: "Assigned to",
      value: "assignToUserId",
      className: "hidden md:table-cell text-medium text-zinc-500",
    },
  ];
  return (
    <div className="flex w-full flex-col ">
      <Table
        isHeaderSticky
        bottomContentPlacement="outside"
        topContentPlacement="outside"
        color="warning"
        shadow="none"
        removeWrapper
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn
              key={column.value}
              className={` text-medium ${
                column.className ? column.className : ""
              } transition-all duration-600 ease-in-out hover:ease-in-out hover:text-orange-400`}
            >
              <NextLink
                href={{
                  query: {
                    status: search,
                    orderBy: column.value,
                  },
                }}
              >
                {column.label}
              </NextLink>
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"No issues to display."}>
          {data?.map((issue: any) => (
            <TableRow key={issue.id}>
              <TableCell className="text-slate-500 pr-8">
                {issue?.title}
                <div className="flex flex-col gap-1 sm:flex-row md:hidden ">
                  <IssueStatusChip status={issue?.status} />
                  <Chip
                    variant="flat"
                    color="default"
                    className="text-orange-400"
                  >
                    {issue?.assignToUserId ?? "TBA"}
                  </Chip>
                </div>
              </TableCell>
              <TableCell className="text-slate-500 hidden md:table-cell">
                <IssueStatusChip status={issue?.status} />
              </TableCell>
              <TableCell className="text-slate-500 hidden md:table-cell">
                {issue?.createdAt.toDateString()}
              </TableCell>
              <TableCell className="text-slate-500">
                <Link href={`/issues/${issue?.id}`}>
                  <Chip
                    endContent={<CgArrowTopRight size={18} />}
                    variant="flat"
                    color="primary"
                  >
                    Details
                  </Chip>
                </Link>
                <div className="block mt-1 md:hidden">
                  <Chip
                    variant="flat"
                    color="default"
                    className="text-orange-400"
                  >
                    {issue?.createdAt.toDateString()}
                  </Chip>
                </div>
              </TableCell>
              <TableCell className="text-slate-500 hidden md:table-cell">
                <Chip
                  variant="flat"
                  color="default"
                  className="text-orange-400"
                >
                  {issue?.assignToUserId ?? "TBA"}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination totalPage={issueCount} pageSize={pageSize} current={page} />
    </div>
  );
};

export default IssueTable;
