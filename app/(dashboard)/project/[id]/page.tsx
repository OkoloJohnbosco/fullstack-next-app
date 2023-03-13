import Input from "@/components/input/input";
import React from "react";

function SingleProject() {
  return (
    <div className="p-8 mx-auto flex flex-col gap-4 flex-1 w-full max-w-[600px]">
      <Input placeholder="extra small size" inputSize="xs" />
      <Input placeholder="small size" inputSize="sm" />
      <Input placeholder="medium size" inputSize="md" />
      <Input placeholder="large size" inputSize="lg" />
      <Input
        placeholder="large size with a secondary variant"
        inputSize="lg"
        variant="secondary"
      />
    </div>
  );
}

export default SingleProject;
