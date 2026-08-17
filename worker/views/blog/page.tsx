import { Markdown } from "../docs/markdown";
import { PostLayout } from "./layout";
import type { PostMeta } from "./posts";

export function PostPage({ meta, content }: { meta: PostMeta; content: string }) {
  return (
    <PostLayout meta={meta}>
      <Markdown>{content}</Markdown>
    </PostLayout>
  );
}
