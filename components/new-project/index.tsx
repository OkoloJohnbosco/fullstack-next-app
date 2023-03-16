"use client";

import { FormEvent, useState, useTransition } from "react";

import Button from "../button";
import Input from "../input";
import Modal from "react-modal";
import { createNewProject } from "@/lib/api";
import { useRouter } from "next/navigation";

Modal.setAppElement("#modal");

const NewProject = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createNewProject(name);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      closeModal();
      setName("");
      router.refresh();
    });
  };

  return (
    <div
      id="modal"
      className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center"
    >
      <Button onClick={() => openModal()}>+ New Project</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-full max-w-xl mx-auto bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
          <Input
            placeholder="project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            className="flex items-center space-x-4 py-3 rounded-sm"
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

export default NewProject;
