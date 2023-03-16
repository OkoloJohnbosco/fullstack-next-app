import TasksCard from "@/components/task-card";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id, ownerId: user?.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

export default async function ProjectPage({ params }: any) {
  const project = await getData(params.id);

  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      {/* @ts-expect-error  Server Component */}
      <TasksCard tasks={project?.tasks} title={project?.name as string} />
    </div>
  );
}

// import Input from "@/components/input/input";
// import React from "react";

// function SingleProject() {
//   return (
//     <div className="p-8 mx-auto flex flex-col gap-4 flex-1 w-full max-w-[600px]">
//       <Input placeholder="extra small size" inputSize="xs" />
//       <Input placeholder="small size" inputSize="sm" />
//       <Input placeholder="medium size" inputSize="md" />
//       <Input placeholder="large size" inputSize="lg" />
//       <Input
//         placeholder="large size with a secondary variant"
//         inputSize="lg"
//         variant="secondary"
//       />
//     </div>
//   );
// }

// export default SingleProject;
