import { MarkdownPage, MarkdownPageMetadata } from "@/components/markdown_page";
import { parseAll } from "@/markdown";
import { Metadata } from "next";

interface Doc {
  name: string
}

export async function generateStaticParams(): Promise<Doc[]> {
  return (await parseAll())
    .filter(entry => entry.markdown.webPathComponents[0] === "docs")
    .map(entry => { return { name: entry.markdown.webPathComponents[1] } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Doc>
}): Promise<Metadata> {
  const doc = await params
  return MarkdownPageMetadata(["docs", doc.name], { title: "Webrogue" });
}

export default async function Page({
  params,
}: {
  params: Promise<Doc>
}) {
  const doc = await params;

  return MarkdownPage(["docs", doc.name]);
}
