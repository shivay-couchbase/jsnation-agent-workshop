import showdown from "showdown";

const converter = new showdown.Converter();

const htmlToMd = (html: string): string => converter.makeMarkdown(html);

export default htmlToMd;
