"use client";

import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { PiTrashSimpleLight } from "react-icons/pi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [isDeleteing, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues/");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      toast.error("Could not delete an issue!");
    }
  };
  return (
    <>
      <Toaster />
      <Button
        className=" mb-1"
        color="danger"
        variant="light"
        aria-label="Delete"
        isIconOnly
        onPress={onOpen}
        isDisabled={isDeleteing}
        isLoading={isDeleteing}
      >
        <PiTrashSimpleLight size={20} />
      </Button>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -100,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-zinc-600 text-3xl font-semibold">
                Confirmation Delete
              </ModalHeader>
              <ModalBody>
                <p className="text-zinc-400">
                  Are you sure you want to delete this issue? This action cannot
                  be undone
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  Back
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleDelete}
                >
                  Delete !
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteIssueButton;
