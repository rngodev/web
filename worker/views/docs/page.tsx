import { DocsLayout } from "./layout";
import { Markdown } from "./markdown";

export function DocPage({
  section,
  active,
  content,
}: {
  section: string;
  active: string;
  content: string;
}) {
  return (
    <DocsLayout section={section} active={active}>
      <Markdown>{content}</Markdown>
    </DocsLayout>
  );
}
