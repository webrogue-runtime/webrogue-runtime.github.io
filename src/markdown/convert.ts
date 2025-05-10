import { isExport } from "@/is_export";
import { parseAll } from "./parse_all";
import * as types from "./types";

export function getRelPath(oldPath: string[], newPath: string[]): string {
    const newIsDir = newPath[newPath.length - 1] === "index";

    oldPath = oldPath.slice(0, -1);
    if (newIsDir) {
        newPath = newPath.slice(0, -1);
        if (!isExport() && newPath.length !== 0) {
            newPath.push("index");
        }
    }

    let sameParts = 0;
    for (let index = 0; index < Math.min(newPath.length, oldPath.length); index++) {
        if (newPath[index] === oldPath[index]) {
            sameParts++;
        } else {
            break;
        }
    }
    const relPath = Array(oldPath.length - sameParts).fill("..");
    relPath.push(...(newPath.slice(sameParts)));
    let result = relPath.join("/");
    if (isExport()) {
        if (newIsDir) {
            if (result == "") {
                result = ".";
            } else {
                result += "/";
            }
        } else {
            result += ".html";
        }
    }

    return result;
}

export async function getConverted(path: string[]): Promise<types.Markdown> {
    const all = await parseAll();
    const joinedPath = path.join("/");
    const result = all.find(entry => entry.path === joinedPath);
    if (!result) {
        throw new Error(`Unable to find ${joinedPath} in parsed documents`);
    }

    function visitParagraphElement(
        element: types.ParagraphElement,
    ) {
        if (element.type !== "link") { return }
        if (element.link.startsWith("https://")) { return }

        const thisPath = result!.markdown.webPathComponents.slice(0, -1);
        const newPath = [...thisPath];
        for (const part of element.link.split("/")) {
            if (part === ".") continue;
            if (part === "") continue;
            newPath.push(part);
        }
        element.link = getRelPath(result!.markdown.webPathComponents, newPath);
    }

    result.markdown.elements.forEach(element => {
        switch (element.type) {
            case 'paragraph': {
                element.paragraphElements.forEach(visitParagraphElement);
                break;
            };
            case "list": {
                element.items.forEach(item => item.listElements.forEach(visitParagraphElement))
                break;
            }
        }
    })
    return result.markdown;
}