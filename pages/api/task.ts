import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/lib/db";
import { validateJWT } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await validateJWT(
    req.cookies[process.env.COOKIE_NAME as string] as string
  );

  await db.task.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
      projectId: req.body.projectId,
      description: req.body.description,
    },
  });

  res.json({ data: { message: "Successfully created a new Task" } });
}
