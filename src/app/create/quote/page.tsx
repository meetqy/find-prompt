"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { convertToHans, convertToHant } from "~/utils/convert";

export default function AuthorPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams?.token ?? "";
  const router = useRouter();
  const quote = api.quote.createMany.useMutation({
    onSuccess(data) {
      console.log(data);
      alert("保存成功");
    },
    onError(err) {
      console.error(err);
      alert("保存失败");
    },
  });

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
              const data = arr.map((item) => ({
                sentence: convertToHans(item),
                sentence_zh_Hant: convertToHant(item),
              }));

              quote.mutate({
                token,
                data,
              });
            }}
          >
            一键保存
          </Button>
        </div>
      </div>

      <div className="grid-co grid">
        {arr.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </>
  );
}
