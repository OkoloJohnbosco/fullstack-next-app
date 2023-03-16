import { Prisma, TASK_STATUS } from "@prisma/client";

import Button from "../button";
import Card from "../card";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

const projectTasks = Prisma.validator<Prisma.TaskArgs>()({});

type Task = Prisma.TaskGetPayload<typeof projectTasks>;

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 6,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};
const TasksCard = async ({
  title,
  tasks,
}: {
  title: string;
  tasks?: Task[];
}) => {
  const data = tasks ?? (await getData());

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div className="py-2" key={task.id}>
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TasksCard;
