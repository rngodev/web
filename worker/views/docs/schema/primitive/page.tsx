/** @jsxImportSource hono/jsx */
import { DocPage } from "../../page";

const modules = import.meta.glob<string>("./*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const primitiveMarkdown: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([file, content]) => [file.replace(/^\.\/(.+)\.md$/, "$1"), content]),
);

export function PrimitivePage({ name }: { name: string }) {
  const markdown = primitiveMarkdown[name];
  if (markdown === undefined) {
    throw new Error(
      `No markdown source for schema primitive "${name}" (expected ./${name}.md in worker/views/docs/schema/primitive)`,
    );
  }

  return <DocPage section="Schema" active={name} content={markdown} />;
}
