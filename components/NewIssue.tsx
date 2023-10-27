"use client";

import { issueSchema } from "@/app/validationSchema";
import { Button, Chip, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type IssueForm = z.infer<typeof issueSchema>;

const NewIssue = () => {
  const { register, handleSubmit } = useForm<IssueForm>({});
  const [error, setError] = useState({
    title: { _errors: [] },
    description: { _errors: [] },
  });
  const [mainError, setMainError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const onSumbit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error: any) {
      setIsSubmitting(false);
      setError(error.response.data);
      setMainError(true);
    }
  });
  return (
    <form className="flex space-y-4 flex-col w-8/12" onSubmit={onSumbit}>
      {mainError && (
        <Chip
          size={"lg"}
          onClose={() => setMainError(!mainError)}
          color="danger"
          variant="faded"
        >
          An error occurs!
        </Chip>
      )}{" "}
      <Input
        className=" text-slate-400"
        key={"outside"}
        label="Title"
        labelPlacement={"outside"}
        placeholder="Set a title"
        {...register("title")}
        errorMessage={error?.title?._errors[0]}
      />{" "}
      <Textarea
        className=" text-slate-400"
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description"
        {...register("description")}
        errorMessage={error?.description?._errors[0]}
      />{" "}
      <Button
        type="submit"
        variant="shadow"
        color="primary"
        className="flex  text-white"
        isLoading={isSubmitting}
      >
        {" "}
        Submit new issue
      </Button>
    </form>
  );
};

export default NewIssue;
