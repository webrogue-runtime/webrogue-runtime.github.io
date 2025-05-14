import * as path from "path";
import * as fs from "fs";
import { Markdown, parse } from ".";

export interface ParseAllEntry {
    path: string,
    markdown: Markdown
}

export async function parseAll(): Promise<ParseAllEntry[]> {
    const result: ParseAllEntry[] = [];

    async function addPaths(pathComponents: string[], realPathComponents: string[]) {
        result.push({
            path: pathComponents.join("/"),
            markdown: await parse(pathComponents, getRootMDPath(realPathComponents))
        })
    }

    async function addRootMD(pathComponents: string[]) {
        await addPaths(pathComponents, pathComponents)
    }

    await addPaths(["index"], ["external", "webrogue", "README"]);

    const postsDirPath = path.join(process.cwd(), "posts");
    const postFileNames = fs.readdirSync(postsDirPath);

    for (const postFile of postFileNames.filter(postFileNames => postFileNames.endsWith(".md"))) {
        await addRootMD(["posts", postFile.slice(0, -3)]);
    }

    const guidesDirPath = path.join(process.cwd(), "guides");
    const guidesFileNames = fs.readdirSync(guidesDirPath);

    for (const postFile of guidesFileNames.filter(guideFileName => guideFileName.endsWith(".md"))) {
        await addRootMD(["guides", postFile.slice(0, -3)]);
    }

    return result;
}

function getRootMDPath(pathComponents: string[]) {
    let mdPath = process.cwd();
    for (let index = 0; index < pathComponents.length; index++) {
        const pathComponent = pathComponents[index];
        mdPath = path.join(mdPath, pathComponent + (index === pathComponents.length - 1 ? ".md" : ""));
    }
    return mdPath;
}