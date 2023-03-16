import Greetings from "@/components/greetings";
import GreetingsSkeleton from "@/components/greeting-skeleton";
import Link from "next/link";
import NewProject from "@/components/new-project";
import ProjectCard from "@/components/project-card";
import { Suspense } from "react";
import TasksCard from "@/components/task-card";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";

const getData = async () => {
  // await delay(2000);
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects };
};

export default async function Page() {
  const { projects } = await getData();
  return (
    <div className="h-full overflow-y-auto pr-6 w-full flex-1">
      <div className=" h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          {/** greetings here */}
          <Suspense fallback={<GreetingsSkeleton />}>
            {/* @ts-expect-error Server Component */}
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {/** projects map here */}
          {projects.map((project, index) => (
            <div className="w-1/3 p-3" key={project.id + index}>
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-3">
            {/* new project here */}
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            {/* tasks here */}
            {/* @ts-expect-error  Server Component */}
            <TasksCard />
          </div>
        </div>
      </div>
    </div>
  );
}
