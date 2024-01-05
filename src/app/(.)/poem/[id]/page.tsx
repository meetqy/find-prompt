import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import styles from "./page.module.css";
import { InboxIcon, UserIcon } from "@heroicons/react/24/outline";
import { type Metadata } from "next";
import { RightAside } from "~/components/RightAside";
import BackButton from "~/components/BackButton";
import PinYinText from "./PinYinText";
import { HeaderMain } from "~/components/header";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const poem = await api.poem.findById.query(Number(params.id));

  if (!poem) {
    return notFound();
  }

  return {
    title: `${poem.title}: ${poem.author.name} | AsPoem`,
    description: `${poem.content.substring(0, 100)} `,
    keywords: [poem.title, poem.author.name],
  };
}

export default async function Page({ params }: Props) {
  const poem = await api.poem.findById.query(Number(params.id));

  if (!poem) {
    return notFound();
  }

  const contentPinYin = poem.contentPinYin?.split("\n") ?? [];

  return (
    <>
      <HeaderMain>
        <div className="breadcrumbs flex h-16 items-center px-4 text-sm">
          <BackButton />
          <div className="mx-5 leading-none text-base-content/50">|</div>
          <ul>
            <li>
              <Link href={"/"}>全部</Link>
            </li>
            <li>
              <Link href={`/poem/${poem.id}?lt=${poem.title}`}>
                {poem.title}
              </Link>
            </li>
          </ul>
        </div>
      </HeaderMain>

      <article className="prose prose-2xl relative m-auto pb-4 pt-8 text-center prose-p:text-3xl">
        <div className={styles.title}>
          <h1 className="text-stroke-base-100">{poem.title}</h1>
        </div>

        <PinYinText
          text={poem.title}
          pinyin={poem.titlePinYin ?? ""}
          type="h1"
          stroke
          className={styles.title2}
        />

        <p>
          {poem.author.dynasty && (
            <span className="font-light">{poem.author.dynasty} · </span>
          )}
          <Link
            href={`/author/${poem.author.id}?lt=${poem.author.name}`}
            className="bg-gradient-to-tr from-primary via-current to-secondary bg-clip-text no-underline"
            style={{
              WebkitTextFillColor: "transparent",
            }}
          >
            {poem.author.name}
          </Link>
        </p>

        {poem.introduce && (
          <blockquote>
            <p className="text-left !text-lg">{poem.introduce}</p>
          </blockquote>
        )}

        <p>
          {poem.content.split("\n").map((line, index) => {
            const linePinYin = contentPinYin[index];

            return <PinYinText key={index} text={line} pinyin={linePinYin} />;
          })}
        </p>
      </article>

      <RightAside>
        <div className="join absolute bottom-4 left-0 flex w-full px-4">
          <Link
            href={`/create/author?id=${poem.authorId}`}
            className="btn join-item flex-1"
          >
            <UserIcon className="h-4 w-4" />
            作者
          </Link>

          <Link href={`/create?id=${poem.id}`} className="btn join-item flex-1">
            <InboxIcon className="h-4 w-4" />
            作品
          </Link>
        </div>
      </RightAside>
    </>
  );
}
