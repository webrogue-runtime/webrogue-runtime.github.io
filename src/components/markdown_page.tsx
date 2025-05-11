import * as markdown from "@/markdown";
import { JSX } from "react";
import { GeistMono } from 'geist/font/mono';
import Image from "next/image";
import { getConverted } from "@/markdown";
import { getRelPath } from "@/markdown/convert";
import { Metadata } from "next";

function ParagraphElementView(element: markdown.ParagraphElement, index: number): JSX.Element | string {
  let result;
  switch (element.type) {
    case "text": {
      result = element.text;
      break;
    }
    case "link": {
      result = <a key={index} href={element.link} className="pageRef">{element.linkText}</a>
      break;
    }
    case "code": {
      result = <code key={index} className={`codeInline ${GeistMono.className}`}>{element.code}</code>;
      break;
    }
  }

  return result
}

function ListElementView(item: markdown.ListItem, index: number): JSX.Element | string {
  const content = [];
  for (let index = 0; index < item.listElements.length; index++) {
    const listElement = item.listElements[index];
    content.push(ParagraphElementView(listElement, index))
  }
  return <li key={index}>
    {content}
  </li>
}

function MarkdownElementView(
  element: markdown.MarkdownElement,
  index: number
): JSX.Element | null {
  switch (element.type) {
    case "paragraph": {
      const content = [];
      for (let index = 0; index < element.paragraphElements.length; index++) {
        const paragraphElement = element.paragraphElements[index];
        content.push(ParagraphElementView(paragraphElement, index))
      }
      return <p key={index}>
        {content}
      </p>
    }
    case "list": {
      const content = [];
      for (let index = 0; index < element.items.length; index++) {
        const item = element.items[index];
        content.push(ListElementView(item, index))
      }
      return <ul key={index}>
        {content}
      </ul>
    }
    case "header": {
      switch (element.level) {
        case 1: {
          return <h1 key={index}>{element.text}</h1>
        }
        default: {
          return <h2 key={index}>{element.text}</h2>
        }
      }
    }
    case "code": {
      return <div key={index} className={`codeBlock ${GeistMono.className}`}>
        <pre>
          <code>
            {element.code}
          </code>
        </pre>
      </div>
    }
    case "comment": {
      switch (element.comment) {
        case "Webrogue logo": {
          return <div key={index} className="logoContainer">
            <Image src="logo.svg" alt="" width="100" height="100" loading="eager"></Image>
            <h1>Webrogue</h1>
          </div>;
        }
        default: {
          return null;
        }
      }
    }
    case "image": {
      return <Image
        key={index}
        src={`/${element.imagePath.split("/").slice(-1)[0]}`}
        alt=""
        width={1000}
        height={1000}
        unoptimized={true}
        className="mdImage"
      ></Image>
    }
  }
}

export async function MarkdownPageMetadata(
  path: string[], options: {
    title?: string
  }
): Promise<Metadata> {
  const markdown = await getConverted(path);
  return {
    title: options?.title ?? markdown.title,
    icons: "/favicon.ico"
  }
}

export async function MarkdownPage(
  path: string[]
) {
  const markdown = await getConverted(path);

  const content = [];
  for (let index = 0; index < markdown.elements.length; index++) {
    const view = MarkdownElementView(markdown.elements[index], index);
    if (view) {
      content.push(view);
    }
  }
  const headerContent = [];
  if (path.length !== 1 || path[0] !== "index") {
    headerContent.push(
      <a key="1" href={`${getRelPath(path, ["index"])}`} className="rootRef">
        Webrogue
      </a>
    );
  }
  headerContent.push(
    <nav key="2">
      <a className="navRef" href={getRelPath(path, ["guides", "index"])}>
        Guides
      </a>
    </nav >
  )

  return (
    <div>
      <header>
        <div className="width-limited">
          {headerContent}
        </div>
      </header>

      <main className="width-limited">
        {content}
      </main>
      <footer>

      </footer>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
