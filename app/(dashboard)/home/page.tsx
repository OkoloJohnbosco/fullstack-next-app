import Greetings from "@/components/greetings";
import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";

export default async function Page() {
  return (
    <div className="h-full overflow-y-auto pr-6 w-full flex-1">
      <div className=" h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          {/** greetings here */}
          <Greetings />
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {/** projects map here */}
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">{/* tasks here */}Home</div>
        </div>
      </div>
    </div>
  );
}
