type methods = "post" | "get" | "delete" | "patch" | "put";

interface RequestProps {
  url: string;
  method: Uppercase<methods>;
  body: any;
  json?: boolean;
}

export const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: RequestProps) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const register = async (user: any) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const signin = async (user: any) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false,
  });
};

export const createNewProject = (name: string) => {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: { name },
  });
};

export const createNewTask = ({
  name,
  projectId,
  description,
}: {
  name: string;
  projectId: string;
  description: string;
}) => {
  return fetcher({
    url: "/api/task",
    method: "POST",
    body: { name, projectId, description },
  });
};
