"use client";

import { FormEvent, useState, useTransition } from "react";

import Button from "../button";
import Input from "../input";
import Modal from "react-modal";
import { createNewTask } from "@/lib/api";
import { useRouter } from "next/navigation";

Modal.setAppElement("#modal");

const NewTask = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createNewTask({ name, projectId, description });
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      closeModal();
      setName("");
      setDescription("");
      router.refresh();
    });
  };

  return (
    <div
      id="modal"
      className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center"
    >
      <Button onClick={() => openModal()}>+ New task</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-full max-w-xl mx-auto bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New task</h1>
        <form
          className="flex flex-col items-center space-y-4"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="submit"
            className="flex items-center space-x-4 py-3 rounded-md"
          >
            {isPending && (
              <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-white"></span>
            )}
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewTask;
