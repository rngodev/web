export type PostType = "release-friday";

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  type: PostType;
}

export const posts: PostMeta[] = [
  {
    slug: "rngo-init",
    title: "rngo init",
    excerpt: "Added a new `rngo init` command that sets up your project in one step.",
    date: "2026-07-10",
    type: "release-friday",
  },
];
