import { useRequestContext } from "hono/jsx-renderer";

export const SITE_NAME = "rngo";

export interface SeoProps {
  title: string;
  description: string;
  type?: "website" | "article";
}

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props: { seo: SeoProps }): Response | Promise<Response>;
  }
}

/** Renders the title, description, canonical URL and social tags inside `<head>`. */
export function Seo({ title, description, type = "website" }: SeoProps) {
  const url = new URL(useRequestContext().req.url);
  const canonical = `${url.origin}${url.pathname}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}

/** Extracts a plain-text summary (the first prose paragraph) from a markdown document. */
export function describeMarkdown(markdown: string, maxLength = 160): string {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#|```|[-*>|]|\d+\.|!\[|<)/.test(block));
  if (!paragraph) return "";

  const text = paragraph
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).replace(/\s+\S*$/, "")}…`;
}
