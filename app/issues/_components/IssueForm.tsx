"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { issueSchema } from "@/app/validationSchema";
import { Button, Chip, Input, Textarea } from "@nextui-org/react";
import { Issue } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const statusOptions = [
  { key: "OPEN", label: "Open" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "CLOSED", label: "Closed" },
];

const IssueForm = ({ issue }: Props) => {
  const { register, handleSubmit } = useForm<IssueFormData>({});
  const [error, setError] = useState({
    title: { _errors: [] },
    description: { _errors: [] },
  });
  const [mainError, setMainError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(issue?.status || "OPEN");
  const router = useRouter();

  const handleStatusChange = (status: any) => {
    setSelectedStatus(status);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      const requestData = {
        ...data,
        status: selectedStatus,
      };
      if (issue) await axios.patch(`/api/issues/${issue.id}`, requestData);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error: any) {
      setIsSubmitting(false);
      setError(error.response.data);
      setMainError(true);
    }
  });

  return (
    <form className="flex space-y-4 flex-col w-8/12" onSubmit={onSubmit}>
      {mainError && (
        <Chip
          size={"lg"}
          onClose={() => setMainError(!mainError)}
          color="danger"
          variant="faded"
        >
          An error occurs!
        </Chip>
      )}
      <Input
        isRequired
        className=" text-slate-600"
        key={"outside"}
        label="Title"
        labelPlacement={"outside"}
        placeholder="Set a title - write a meaningful title"
        {...register("title")}
        errorMessage={error?.title?._errors[0]}
        defaultValue={issue?.title}
      />
      <Textarea
        isRequired
        className=" text-slate-600"
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description - write a meaningful description"
        {...register("description")}
        errorMessage={error?.description?._errors[0]}
        defaultValue={issue?.description}
      />
      {issue && (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat" color="secondary" className="capitalize">
              {selectedStatus}
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat" color="warning">
            {statusOptions
              .filter((option) => option.key !== issue?.status)
              .map((option) => (
                <DropdownItem
                  className="text-zinc-500"
                  key={option.key}
                  onClick={() => handleStatusChange(option.key)}
                >
                  {option.label}
                </DropdownItem>
              ))}
          </DropdownMenu>
        </Dropdown>
      )}
      <Button
        type="submit"
        variant="shadow"
        color="primary"
        className="flex  text-white"
        isLoading={isSubmitting}
      >
        {issue ? "Update issue" : "Submit a new issue"}
      </Button>
      <Button
        variant="light"
        color="warning"
        className="flex  text-zinc-400"
        onClick={() => router.back()}
      >
        Back
      </Button>
    </form>
  );
};

export default IssueForm;
