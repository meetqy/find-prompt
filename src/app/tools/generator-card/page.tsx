"use client";
import { random } from "lodash-es";
import Image from "next/image";
import { HeaderMain } from "~/components/ui/header";
import { api } from "~/trpc/react";
import { R2Host } from "~/utils";

export default function GeneratorCardPage() {
  const { data } = api.poem.findGeneratorCard.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (!data) return null;

  return (
    <div className="flex">
      <aside className="h-full w-72"></aside>
      <div className="flex-1">
        <div className="m-auto max-w-screen-md">
          <HeaderMain>
            <div className="flex h-16 flex-1 items-center justify-between pl-4">
              <span className="text-f200">
                生成诗词卡片{" "}
                <span className="font-mono text-f100 text-muted-foreground">
                  Beta
                </span>
              </span>
            </div>
          </HeaderMain>

          <div className="my-4 grid h-full grid-cols-2 gap-4 p-4">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative aspect-[9/16] border border-border text-center"
                >
                  <div className="absolute left-0 top-0 h-full w-full">
                    <Image
                      src={`${R2Host}/bg/${random(1, 50)}_md.webp`}
                      fill
                      alt="background"
                    />
                  </div>
                  <div className="absolute left-0 top-0 h-full w-full bg-black opacity-60 backdrop-blur-none"></div>
                  <div
                    className="absolute left-0 top-0 z-20 flex h-full w-full flex-col gap-8 px-8 py-16 text-left text-white"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    <div className="flex flex-col gap-2 text-f300">
                      <div className="tracking-[0.25em]">
                        {item.title.replace(/·(.*?)+/g, "")}
                      </div>
                      <div className="text-f100 font-normal tracking-[0.25em] opacity-80">
                        「{item.author.dynasty}」<span>{item.author.name}</span>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col gap-1 text-f200">
                      {item.content
                        .replace(/\n/g, "")
                        .split(/。|，|：|？/g)
                        .map((i, j) => (
                          <p key={j} className="tracking-[0.25em]">
                            {i}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
