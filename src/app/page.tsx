import { MarkdownPage } from "@/components/markdown_page";
import { getConverted } from "@/markdown";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const markdown = await getConverted(["index"]);
  return {
    title: markdown.title,
  }
}

export default async function Home() {
  return MarkdownPage(["index"]);
}
