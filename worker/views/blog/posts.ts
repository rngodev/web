export type PostType = "release" | "example";

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  type: PostType;
}

export const posts: PostMeta[] = [
  {
    slug: "simulating-a-payments-api",
    title: "Simulating a Payments API",
    excerpt:
      "A walkthrough of modeling charges and refunds with rngo, from system config to a running simulation.",
    date: "2026-06-18",
    type: "example",
  },
  {
    slug: "shorter-cli-commands",
    title: "Shorter CLI Commands, Plus rngo init",
    excerpt:
      "Every CLI command got shorter to type, and a new rngo init command gets a new project running in one step.",
    date: "2026-05-04",
    type: "release",
  },
];
