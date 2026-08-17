import { Hono, type Context } from "hono";
import Layout from "./layout";
import Home from "./views/home";
import Blog from "./views/blog";
import { DocPage } from "./views/docs/page";
import { primitiveMarkdown, PrimitivePage } from "./views/docs/schema/primitive/page";
import { PostPage } from "./views/blog/page";
import { posts } from "./views/blog/posts";

import rngoInitPost from "./views/blog/posts/release-friday/rngo-init.md?raw";
import customSchemaTypesPost from "./views/blog/posts/release-friday/custom-schema-types.md?raw";
import agentSkillsPost from "./views/blog/posts/release-friday/agent-skills.md?raw";
import invariantsPost from "./views/blog/posts/release-friday/invariants.md?raw";
import goodbyeSystemsHelloChannelsPost from "./views/blog/posts/release-friday/goodbye-systems-hello-channels.md?raw";
import rngoSkill from "./views/blog/posts/release-friday/rngo-skill.md?raw";

import platformOverview from "./views/docs/platform/overview.md?raw";
import schemaOverview from "./views/docs/schema/overview.md?raw";
import cliOverview from "./views/docs/cli/overview.md?raw";
import quickStart from "./views/docs/platform/guides/quick-start.md?raw";
import initialize from "./views/docs/platform/guides/initialize.md?raw";
import writeTheSpec from "./views/docs/platform/guides/write-the-spec.md?raw";
import spec from "./views/docs/platform/concepts/spec.md?raw";
import channel from "./views/docs/platform/concepts/channel.md?raw";
import effect from "./views/docs/platform/concepts/effect.md?raw";
import signal from "./views/docs/platform/concepts/signal.md?raw";
import schema from "./views/docs/platform/concepts/schema.md?raw";
import invariant from "./views/docs/platform/concepts/invariant.md?raw";
import cliRun from "./views/docs/cli/run.md?raw";
import cliInit from "./views/docs/cli/init.md?raw";
import cliSkillsInstall from "./views/docs/cli/skills/install.md?raw";

const app = new Hono<{ Bindings: Env }>();

app.use(Layout);

app.get("/", (c) => c.render(<Home />));
app.get("/blog", (c) => c.render(<Blog />));

// Registers both the rendered HTML route and its raw-markdown ({path}.md) counterpart,
// so adding a new blog post only means adding one entry here and to posts.ts.
const blogMarkdown: Record<string, string> = {
  "rngo-init": rngoInitPost,
  "custom-schema-types": customSchemaTypesPost,
  "agent-skills": agentSkillsPost,
  invariants: invariantsPost,
  "goodbye-systems-hello-channels": goodbyeSystemsHelloChannelsPost,
  "rngo-skill": rngoSkill,
};

for (const post of posts) {
  const content = blogMarkdown[post.slug];
  app.get(`/blog/${post.type}/${post.slug}`, (c) =>
    c.render(<PostPage meta={post} content={content} />),
  );
}

function serveBlogMarkdown(c: Context) {
  if (!c.req.path.endsWith(".md")) return c.notFound();
  const path = c.req.path.slice(0, -".md".length);
  const post = posts.find((p) => `/blog/${p.type}/${p.slug}` === path);
  if (!post) return c.notFound();
  return c.text(blogMarkdown[post.slug], 200, { "Content-Type": "text/markdown; charset=utf-8" });
}

app.get("/blog/*", serveBlogMarkdown);

// Registers both the rendered HTML route and its raw-markdown ({path}.md) counterpart,
// so adding a new docs page only means adding one call here.
const docsMarkdown: Record<string, string> = {};
function docsPage(path: string, section: string, active: string, content: string) {
  docsMarkdown[path] = content;
  app.get(path, (c) => c.render(<DocPage section={section} active={active} content={content} />));
}

docsPage("/docs", "Platform", "Overview", platformOverview);
docsPage("/docs/guides/quick-start", "Platform", "Quick Start", quickStart);
docsPage("/docs/guides/initialize", "Platform", "Initialize", initialize);
docsPage("/docs/guides/write-the-spec", "Platform", "Write the Spec", writeTheSpec);
docsPage("/docs/concepts/spec", "Platform", "Spec", spec);
docsPage("/docs/concepts/channel", "Platform", "Channel", channel);
docsPage("/docs/concepts/effect", "Platform", "Effect", effect);
docsPage("/docs/concepts/invariant", "Platform", "Invariant", invariant);
docsPage("/docs/concepts/signal", "Platform", "Signal", signal);
docsPage("/docs/concepts/schema", "Platform", "Schema", schema);
docsPage("/docs/schema", "Schema", "Overview", schemaOverview);
docsPage("/docs/cli", "CLI", "Overview", cliOverview);
docsPage("/docs/cli/init", "CLI", "init", cliInit);
docsPage("/docs/cli/run", "CLI", "run", cliRun);
docsPage("/docs/cli/skills/install", "CLI", "skills install", cliSkillsInstall);

// Primitives are auto-discovered from worker/views/docs/schema/primitive/*.md,
// so a new primitive file needs no changes here.
for (const [name, content] of Object.entries(primitiveMarkdown)) {
  docsMarkdown[`/docs/schema/primitive/${name}`] = content;
  app.get(`/docs/schema/primitive/${name}`, (c) => c.render(<PrimitivePage name={name} />));
}

function serveDocsMarkdown(c: Context) {
  if (!c.req.path.endsWith(".md")) return c.notFound();
  const content = docsMarkdown[c.req.path.slice(0, -".md".length)];
  if (content === undefined) return c.notFound();
  return c.text(content, 200, { "Content-Type": "text/markdown; charset=utf-8" });
}

app.get("/docs.md", serveDocsMarkdown);
app.get("/docs/*", serveDocsMarkdown);

export default app;
