"use client";

import { api } from "~/trpc/react";

export default function Page() {
  const { data } = api.author.findMany.useQuery({
    pageSize: 999,
    select: ["name"],
  });

  console.log(data);

  return 123;
}
