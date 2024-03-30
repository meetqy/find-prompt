"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function AuthorPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams?.token ?? "";
  const router = useRouter();

  const [json, setJson] = useState("");

  const [arr, setArr] = useState<string[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token") && !token) {
      router.replace(`?token=${localStorage.getItem("token")}`);
    }
  }, [router, token]);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <h1 className="prose-h1">名句</h1>
      </div>
      <div className="space-y-4 py-6">
        <div className="flex justify-between space-x-4">
          <Input
            value={json}
            placeholder="string[]"
            onChange={(e) => setJson(e.target.value)}
          />
          <Button
            onClick={() => {
              setArr(JSON.parse(json) as string[]);
            }}
          >
            一键填充
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              setArr(JSON.parse(json) as string[]);
            }}
          >
            一键保存
          </Button>
        </div>

        <div className="flex flex-col text-f50">
          {arr.map((item, index) => (
            <div key={index}>
              <div>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
