"use client";
import React, { useState } from "react";
import {
  Pagination as Paginate,
  Button,
  usePagination,
  PaginationItemType,
  PaginationItemRenderProps,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  totalPage: string;
  pageSize: number;
  current: number;
}

const Pagination = ({ totalPage, pageSize, current }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(current);
  const total = Math.ceil(parseInt(totalPage) / pageSize);

  const handleChange = (page: any, type: PaginationItemType) => {
    if (type === PaginationItemType.PREV) {
      setCurrentPage((prev) => (page > 1 ? page - 1 : prev));
    }
    if (type === PaginationItemType.NEXT) {
      setCurrentPage((prev) => (page < 10 ? page + 1 : prev));
    }
    if (type === PaginationItemType.DOTS) {
      return null;
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <Paginate
        total={total}
        color="secondary"
        onChange={(page: number, type?: any) => handleChange(page, type)}
        classNames={{
          item: "text-orange-400",
        }}
        page={currentPage}
      />{" "}
      {/*<div className="flex gap-2">
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          onPress={() =>
            setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
          }
        >
          Next
        </Button>
        </div>*/}
    </div>
  );
};

export default Pagination;
