import { MarkdownPage, MarkdownPageMetadata } from "@/components/markdown_page";
import { parseAll } from "@/markdown";
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
  const guide = await params;
  return MarkdownPageMetadata(["guides", guide.name], { title: "Webrogue" });
}

export default async function Page({
  params,
}: {
  params: Promise<Guide>
}) {
  const guide = await params;

  return MarkdownPage(["guides", guide.name]);
}
