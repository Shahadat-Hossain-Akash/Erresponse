import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuePage = () => {
  return (
    <div className="flex flex-col  font-quicksand">
      <Link href={"/issues/new"}>
        <Button variant="surface" size={"3"}>
          Create an issue
        </Button>
      </Link>
    </div>
  );
};

export default IssuePage;
