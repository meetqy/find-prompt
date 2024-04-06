"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { convertToHans, convertToHant } from "~/utils/convert";

interface SaveData {
  sentence: string;
  sentence_zh_Hant: string;
  poemId: number;
}

export default function QuotePage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams?.token ?? "";
  const router = useRouter();
  const quote = api.quote.createMany.useMutation({
    onSuccess(data) {
      localStorage.setItem(
        "quote-already-save-data",
        JSON.stringify([
          ...(saveData || []).map((item) => item.sentence),
          ...alreadySaveData,
        ]),
      );

      console.log(data);
      alert("保存成功");
    },
    onError(err) {
      console.error(err);
      alert("保存失败");
    },
  });

  const [json, setJson] = useState("");
  const [alreadySaveData, setAlreadySaveData] = useState<string[]>([]);

  // 未处理的数据
  const [quotes, setQuotes] = useState<string[]>([]);

  // 保存时需要的数据
  const [saveData, setSaveData] = useState<SaveData[]>();
  const { data: poems } = api.poem.findByQuotes.useQuery(
    quotes.map((item) => item),
    { enabled: quotes.length > 0 },
  );

  useEffect(() => {
    if (poems) {
      const result = poems
        .map((poemId, index) => {
          const quote = quotes[index];

          if (quote && poemId) {
            return {
              sentence: convertToHans(quote),
              sentence_zh_Hant: convertToHant(quote),
              poemId: poemId,
            };
          }

          return null;
        })
        .filter(Boolean) as SaveData[];

      setSaveData(result);
    }
  }, [poems, quotes]);

  useEffect(() => {
    if (localStorage.getItem("token") && !token) {
      router.replace(`?token=${localStorage.getItem("token")}`);
    }

    const already = localStorage.getItem("quote-already-save-data");
    if (already) {
      setAlreadySaveData(JSON.parse(already) as string[]);
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
              const result = (JSON.parse(json) as string[]).map((item) => item);

              setQuotes(
                result.filter(
                  (item) => alreadySaveData.includes(item) === false,
                ),
              );
            }}
          >
            一键填充
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              if (!saveData) return alert("请先填充名句");

              quote.mutate({
                token,
                data: saveData,
              });
            }}
          >
            一键保存
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 text-f100">
        <div>名句</div>
        <div>关联诗词</div>
      </div>

      <div className="mt-4">
        {quotes.map((item, index) => (
          <div key={index} className="grid grid-cols-2 border-b py-2 text-f50">
            <div>{item}</div>
            <div>{poems?.[index] || "无"}</div>
          </div>
        ))}
      </div>
    </>
  );
}
