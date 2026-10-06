export type PostType = "release-notes";

export interface Release {
  repo: "rngo" | "agent";
  version: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  type: PostType;
  releases: Release[];
}

export const posts: PostMeta[] = [
  {
    slug: "less-slow",
    title: "Less Slow",
    excerpt: "Performance improvements.",
    date: "2026-09-25",
    type: "release-notes",
    releases: [{ repo: "rngo", version: "0.37.0" }],
  },
  {
    slug: "proxies-and-audits",
    title: "Proxies and Audits",
    excerpt: "Add Proxy and Audit concepts.",
    date: "2026-09-18",
    type: "release-notes",
    releases: [{ repo: "rngo", version: "0.36.0" }],
  },
  {
    slug: "log-jam",
    title: "Log Jam",
    excerpt: "Move references and signals into the SQLite run log.",
    date: "2026-08-28",
    type: "release-notes",
    releases: [{ repo: "rngo", version: "0.35.0" }],
  },
  {
    slug: "a-better-run-log",
    title: "A Better Run Log",
    excerpt: "Improve the naming and structure of the run log",
    date: "2026-08-21",
    type: "release-notes",
    releases: [{ repo: "rngo", version: "0.34.0" }],
  },
  {
    slug: "rngo-skill",
    title: "rngo Skill",
    excerpt: "Build a unified rngo skill to handle all rngo operations.",
    date: "2026-08-14",
    type: "release-notes",
    releases: [{ repo: "agent", version: "0.3.0" }],
  },
  {
    slug: "goodbye-systems-hello-channels",
    title: "Goodbye Systems, Hello Channels!",
    excerpt: "Use a better abstraction for routing effects and signals.",
    date: "2026-08-07",
    type: "release-notes",
    releases: [{ repo: "rngo", version: "0.33.0" }],
  },
  {
    slug: "invariants",
    title: "Invariants",
    excerpt: "Set expectations of simulation state.",
    date: "2026-07-31",
    type: "release-notes",
    releases: [{ repo: "rngo", version: "0.32.0" }],
  },
  {
    slug: "agent-skills",
    title: "Agent Skills",
    excerpt: "Teach your coding agent how to use rngo.",
    date: "2026-07-24",
    type: "release-notes",
    releases: [{ repo: "rngo", version: "0.31.0" }],
  },
  {
    slug: "custom-schema-types",
    title: "Custom Schema Types",
    excerpt: "An initial step towards user-defined schema types.",
    date: "2026-07-17",
    type: "release-notes",
    releases: [{ repo: "rngo", version: "0.30.0" }],
  },
  {
    slug: "rngo-init",
    title: "rngo init",
    excerpt: "Added a new `rngo init` command that sets up your project in one step.",
    date: "2026-07-10",
    type: "release-notes",
    releases: [{ repo: "rngo", version: "0.29.0" }],
  },
];
