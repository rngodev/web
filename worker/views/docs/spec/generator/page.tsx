/** @jsxImportSource hono/jsx */
import { DocPage } from "../../page";

const modules = import.meta.glob<string>("./*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const generatorTypeMarkdown: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([file, content]) => [file.replace(/^\.\/(.+)\.md$/, "$1"), content]),
);

export function GeneratorTypePage({ name }: { name: string }) {
  const markdown = generatorTypeMarkdown[name];
  if (markdown === undefined) {
    throw new Error(
      `No markdown source for generator type "${name}" (expected ./${name}.md in worker/views/docs/spec/generator)`,
    );
  }

  return <DocPage section="Spec" active={name} content={markdown} />;
}
