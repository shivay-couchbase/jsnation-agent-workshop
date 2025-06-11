import showdown from "showdown";

const converter = new showdown.Converter();

const mdToHtml = (md: string): string => converter.makeHtml(md);

export default mdToHtml;
