"use client";
import React, { useEffect, useState } from "react";
import IssueStatusChip from "./IssueStatusChip";
import { Code } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import DeleteIssueButton from "./DeleteIssueButton";
import { useSession } from "next-auth/react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { User } from "@prisma/client";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const IssueDetails = ({ issue }: any, { session }: any) => {
  const { status } = useSession();

  const [users, setUsers] = useState<any>([]);
  const [name, setName] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };
    fetchUser();
  }, []);

  const assignIssue = (userId: any) => {
    try {
      axios.patch(`/api/issues/${issue.id}`, {
        assignToUserId: userId["currentKey"] || null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="text-slate-700 flex w-full flex-col gap-y-4 min-h-screen">
        <div className="flex w-full items-end justify-between ">
          <div className="flex items-center sm:items-end gap-x-4">
            <h1 className="text-3xl sm:text-6xl align-text-top font-semibold subpixel-antialiased">
              {issue.title}
            </h1>
            {status === "authenticated" && (
              <Link href={`/issues/${issue.id}/edit`}>
                <Button
                  className=" mb-1"
                  variant="light"
                  isIconOnly
                  color="warning"
                  aria-label="Edit"
                >
                  <CiEdit size={"28"} />
                </Button>
              </Link>
            )}
          </div>
          {status === "authenticated" && (
            <DeleteIssueButton issueId={issue.id} />
          )}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2 items-center">
            <IssueStatusChip status={issue.status} />
            <Code color="danger" className="w-fit">
              {issue.createdAt?.toDateString()}
            </Code>
          </div>

          <Select
            items={users}
            placeholder="Assign to"
            labelPlacement="outside"
            className="max-w-xs text-orange-400"
            color="primary"
            radius="lg"
            defaultValue={issue?.assignToUserId}
            onSelectionChange={(userId) => {
              assignIssue(userId);
            }}
          >
            <SelectItem
              value=""
              key=""
              color="secondary"
              className="text-orange-200"
              variant="flat"
              onClick={() => {
                toast.success("Issue unassigned");
              }}
            >
              Unassigned
            </SelectItem>
            {users.map((user: any) => (
              <SelectItem
                key={user?.id}
                textValue={user?.name ?? ""}
                value={user?.id}
                onClick={() => {
                  toast.success(
                    `Successfully assigned to user with id ${user?.name}`
                  );
                }}
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={user?.name ?? ""}
                    className="flex-shrink-0"
                    size="sm"
                    src={user?.image ?? ""}
                  />
                  <div className="flex flex-col">
                    <span className="text-small text-orange-400">
                      {user?.name}
                    </span>
                    <span className="text-tiny text-default-400">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </Select>
        </div>
        <p className="text-2xl bg-neutral-200 p-3 rounded-2xl text-zinc-700 mb-8">
          {issue.description}
        </p>
      </div>
    </>
  );
};

export default IssueDetails;
