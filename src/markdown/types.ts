export interface TextParagraphElement {
    type: "text",
    text: string
}

export interface LinkParagraphElement {
    type: "link",
    linkText: string,
    link: string,
}

export interface CodeParagraphElement {
    type: "code",
    code: string,
}

export type ParagraphElement = TextParagraphElement | LinkParagraphElement | CodeParagraphElement;

export interface Paragraph {
    type: "paragraph",
    paragraphElements: ParagraphElement[]
}

export interface ListItem {
    listElements: ParagraphElement[]
}

export interface List {
    type: "list",
    items: ListItem[]
}

export interface Header {
    type: "header",
    level: number,
    text: string,
}

export interface Code {
    type: "code",
    code: string,
}

export interface Comment {
    type: "comment",
    comment: string,
}

export interface Image {
    type: "image",
    imagePath: string,
}

export type MarkdownElement = Paragraph | List | Header | Code | Comment | Image;

export interface Markdown {
    webPathComponents: string[],
    title: string | null,
    elements: MarkdownElement[]
}
