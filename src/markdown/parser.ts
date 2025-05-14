import * as fs from 'fs';
import * as types from './types';

export async function parse(
    pathComponents: string[],
    mdPath: string
): Promise<types.Markdown> {
    const file = fs.readFileSync(
        mdPath,
        "utf8"
    );

    let result = [];
    let currentElement: types.MarkdownElement | null = null;
    let lastNewline: number | null = null;
    let pageTitle: string | null = null;

    for (let index = 0; index < file.length; index++) {
        let char = file[index];
        if (char == "\n") {
            if (index - 1 === lastNewline) {
                if (currentElement) {
                    result.push(currentElement);
                    currentElement = null;
                }
                continue;
            }
            lastNewline = index;
        }
        if (char == "!") {
            const nextChar = file[index + 1];
            if (nextChar === "[") {
                index++
                char = nextChar;
            }
        }
        if (char == "[") {
            let bracketLevel = 1;
            let openingSquareBrackets = index;
            let closingSquareBrackets = null;
            do {
                index++;
                if (file[index] === undefined) {
                    throw Error("Unterminated link")
                }
                if (file[index] === "[") {
                    bracketLevel++;
                }
                if (file[index] === "]") {
                    bracketLevel--;
                }
            } while (bracketLevel !== 0);
            closingSquareBrackets = index;
            if (closingSquareBrackets !== -1 && file[closingSquareBrackets + 1] === "(") {
                const closingParentheses = file.indexOf(")", closingSquareBrackets);
                if (closingParentheses !== -1) {

                    const link = file.slice(closingSquareBrackets + 2, closingParentheses);
                    const linkText = file.slice(openingSquareBrackets + 1, closingSquareBrackets);
                    if (file[openingSquareBrackets - 1] === "!") {
                        if (currentElement) {
                            result.push(currentElement)
                        }
                        currentElement = {
                            type: 'image',
                            imagePath: link
                        }
                    } else {
                        if (!currentElement) {
                            currentElement = {
                                type: 'paragraph',
                                paragraphElements: []
                            }
                        }
                        const linkElement: types.LinkParagraphElement = {
                            type: 'link',
                            link: link,
                            linkText: linkText
                        }
                        if (!linkText.startsWith("!")) {
                            switch (currentElement.type) {
                                case "paragraph": {
                                    currentElement.paragraphElements.push(linkElement)
                                    break;
                                }
                                case "list": {
                                    currentElement.items[currentElement.items.length - 1].listElements.push(linkElement);
                                    break;
                                }
                            }
                        }
                    }


                    index = closingParentheses;
                    continue;
                }
            }
        }
        if (char === "<") {
            if (file[index + 1] === "!") {
                const closingBracket = file.indexOf(">", index + 1);
                if (closingBracket === -1) {
                    throw Error("Unterminated html comment")
                }
                if (currentElement) {
                    result.push(currentElement);
                }
                currentElement = {
                    type: "comment",
                    comment: file.slice(index + 5, closingBracket - 3)
                }
                index = closingBracket
                continue
            }

            let bracketLevel = 0;
            let tagLevel = 0;
            do {
                if (file[index] === undefined) {
                    throw Error("Unterminated html tag")
                }
                if (file[index] === "<") {
                    bracketLevel++;
                    if (file[index + 1] === "/") {
                    } else if (file[index + 1] === "!") {
                        tagLevel++;
                    } else {
                        tagLevel += 2;
                    }
                }
                if (file[index] === ">") {
                    bracketLevel--;
                    if (file[index - 1] === "/") {
                        tagLevel -= 2;
                    } else {
                        tagLevel--;
                    }
                }
                index++;
            } while (bracketLevel !== 0 || tagLevel !== 0);
            index--;
            continue;
        }
        if (char === "-" && (lastNewline === index - 1 || index === 0)) {
            if (!currentElement || currentElement.type !== 'list') {
                if (currentElement) {
                    result.push(currentElement);
                }
                currentElement = {
                    type: 'list',
                    items: []
                }
            }
            currentElement.items.push({
                listElements: []
            })
            index++;
            continue;
        }
        if (char === "#" && ((lastNewline === (index - 2)) || lastNewline === (index - 1) || lastNewline === null)) {
            let hashCount = 1;
            while (file[index + hashCount] === "#") {
                hashCount++;
            }

            const newline = file.indexOf("\n", index + hashCount);
            if (newline !== -1) {
                if (currentElement) {
                    result.push(currentElement);
                }
                const text = file.slice(index + hashCount, newline);
                if (hashCount === 1 && !pageTitle) {
                    pageTitle = text;
                }
                currentElement = {
                    type: 'header',
                    level: hashCount,
                    text: text
                };
                index = newline;
                continue;
            }
        }
        if (char === "`") {
            if (file[index + 1] === "`" && file[index + 2] === "`") {
                const backtick = file.indexOf("```", index + 3)
                if (backtick !== 1) {
                    if (currentElement) {
                        result.push(currentElement);
                    }
                    currentElement = {
                        type: 'code',
                        code: file.slice(index + 3, backtick).trim()
                    };
                    index = backtick + 2;
                    continue;
                }
            } else {
                const backtick = file.indexOf("`", index + 1)
                if (backtick !== 1) {
                    if (!currentElement) {
                        currentElement = {
                            type: 'paragraph',
                            paragraphElements: []
                        }
                    }
                    const codeElement: types.CodeParagraphElement = {
                        type: 'code',
                        code: file.slice(index + 1, backtick).trim(),
                    }
                    switch (currentElement.type) {
                        case "paragraph": {
                            currentElement.paragraphElements.push(codeElement)
                            break;
                        }
                        case "list": {
                            currentElement.items[currentElement.items.length - 1].listElements.push(codeElement);
                            break;
                        }
                    }
                    index = backtick;
                    continue;
                }
            }
        }


        // other chars
        if (!currentElement) {
            currentElement = {
                type: 'paragraph',
                paragraphElements: []
            }
        }
        switch (currentElement.type) {
            case "paragraph": {
                let lastParagraphElement: types.ParagraphElement | undefined = currentElement.paragraphElements[currentElement.paragraphElements.length - 1];
                if (!lastParagraphElement) {
                    lastParagraphElement = {
                        type: "text",
                        text: ""
                    }
                    currentElement.paragraphElements.push(lastParagraphElement)
                }
                switch (lastParagraphElement.type) {
                    case "text": {
                        lastParagraphElement.text += char;
                        break;
                    }
                    default: {
                        currentElement.paragraphElements.push({
                            type: 'text',
                            text: char,
                        })
                    }
                }
                break;
            }
            case "list": {
                let lastListItem: types.ListItem | undefined = currentElement.items[currentElement.items.length - 1];
                if (!lastListItem) {
                    lastListItem = {
                        listElements: []
                    }
                    currentElement.items.push(lastListItem)
                }
                let lastParagraphElement: types.ParagraphElement | undefined = lastListItem.listElements[lastListItem.listElements.length - 1];
                if (!lastParagraphElement) {
                    lastParagraphElement = {
                        type: 'text',
                        text: "",
                    }
                    lastListItem.listElements.push(lastParagraphElement)
                }
                switch (lastParagraphElement.type) {
                    case "text": {
                        lastParagraphElement.text += char;
                        break;
                    }
                    default: {
                        lastListItem.listElements.push({
                            type: 'text',
                            text: char,
                        })
                    }
                }
                break;
            }
            default: {
                result.push(currentElement);
                currentElement = {
                    type: "paragraph",
                    paragraphElements: [{
                        type: "text",
                        text: char
                    }]
                }
                break;
            }
        }
    }

    if (currentElement) {
        result.push(currentElement)
    }

    result = result
        .flatMap<types.MarkdownElement>((element: types.MarkdownElement) => {
            switch (element.type) {
                case 'paragraph': {
                    element.paragraphElements = element.paragraphElements
                        .flatMap((element: types.ParagraphElement, index, array) => {
                            if (element.type === "text") {
                                if (index === 0)
                                    element.text = element.text.trimStart();
                                if (index === array.length - 1)
                                    element.text = element.text.trimEnd();
                                if (element.text === "")
                                    return [];
                            }
                            return [element];
                        });
                    if (element.paragraphElements.length === 0)
                        return [];
                    return [element];
                }
                default: {
                    return [element];
                }
            }
        });
    return {
        webPathComponents: pathComponents,
        title: pageTitle,
        elements: result
    };
}
