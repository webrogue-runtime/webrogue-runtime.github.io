import { MarkdownPage } from "@/components/markdown_page";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Webrogue",
  }
}

export default async function Home() {
  return MarkdownPage(["index"]);
}
