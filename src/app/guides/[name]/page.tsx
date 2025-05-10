import { MarkdownPage } from "@/components/markdown_page";
import { getConverted, parseAll } from "@/markdown";
import { Metadata } from "next";

interface Guide {
  name: string
}

export async function generateStaticParams(): Promise<Guide[]> {
  return (await parseAll())
    .filter(entry => entry.markdown.webPathComponents[0] === "guides")
    .map(entry => { return { name: entry.markdown.webPathComponents[1] } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Guide>
}): Promise<Metadata> {
  const post = await params
  const markdown = await getConverted(["guides", post.name]);
  return {
    title: markdown.title,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<Guide>
}) {
  const post = await params;

  return MarkdownPage(["guides", post.name]);
}
