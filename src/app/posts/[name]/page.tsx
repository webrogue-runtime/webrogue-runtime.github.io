import { MarkdownPage, MarkdownPageMetadata } from "@/components/markdown_page";
import { parseAll } from "@/markdown";
import { Metadata } from "next";

interface Post {
  name: string
}

export async function generateStaticParams(): Promise<Post[]> {
  return (await parseAll())
    .filter(entry => entry.markdown.webPathComponents[0] === "posts")
    .map(entry => { return { name: entry.markdown.webPathComponents[1] } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Post>
}): Promise<Metadata> {
  const post = await params
  return MarkdownPageMetadata(["posts", post.name], { title: "Webrogue" });
}

export default async function Page({
  params,
}: {
  params: Promise<Post>
}) {
  const post = await params;

  return MarkdownPage(["posts", post.name]);
}
