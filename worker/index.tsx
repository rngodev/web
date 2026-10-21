import { Hono, type Context } from "hono";
import Layout from "./layout";
import Home from "./views/home";
import Blog from "./views/blog";
import { DocPage } from "./views/docs/page";
import { generatorTypeMarkdown, GeneratorTypePage } from "./views/docs/spec/generator/page";
import { PostPage } from "./views/blog/page";
import { posts } from "./views/blog/posts";

import channelingPost from "./views/blog/posts/release-notes/channeling.md?raw";
import lessSlowPost from "./views/blog/posts/release-notes/less-slow.md?raw";
import proxyAndAudit from "./views/blog/posts/release-notes/proxies-and-audits.md?raw";
import logJamPost from "./views/blog/posts/release-notes/log-jam.md?raw";
import rngoInitPost from "./views/blog/posts/release-notes/rngo-init.md?raw";
import customSchemaTypesPost from "./views/blog/posts/release-notes/custom-schema-types.md?raw";
import agentSkillsPost from "./views/blog/posts/release-notes/agent-skills.md?raw";
import invariantsPost from "./views/blog/posts/release-notes/invariants.md?raw";
import goodbyeSystemsHelloChannelsPost from "./views/blog/posts/release-notes/goodbye-systems-hello-channels.md?raw";
import rngoSkill from "./views/blog/posts/release-notes/rngo-skill.md?raw";
import aBetterRunLog from "./views/blog/posts/release-notes/a-better-run-log.md?raw";

import platformOverview from "./views/docs/platform/overview.md?raw";
import formatSql from "./views/docs/spec/format/sql.md?raw";
import formatTemplate from "./views/docs/spec/format/template.md?raw";
import targetExec from "./views/docs/spec/target/exec.md?raw";
import targetStream from "./views/docs/spec/target/stream.md?raw";
import signalSql from "./views/docs/spec/signal/sql.md?raw";
import schemaOverview from "./views/docs/spec/overview.md?raw";
import cliOverview from "./views/docs/cli/overview.md?raw";
import quickStart from "./views/docs/platform/quick-start.md?raw";
import initializeYourProject from "./views/docs/platform/guides/initialize-your-project.md?raw";
import writeTheSpec from "./views/docs/platform/guides/write-the-spec.md?raw";
import channel from "./views/docs/spec/channel.md?raw";
import effect from "./views/docs/spec/effect.md?raw";
import signal from "./views/docs/spec/signal.md?raw";
import generator from "./views/docs/spec/generator.md?raw";
import concepts from "./views/docs/platform/concepts.md?raw";
import log from "./views/docs/platform/reference/log.md?raw";
import expressions from "./views/docs/platform/reference/expressions.md?raw";
import cliEval from "./views/docs/cli/eval.md?raw";
import cliInit from "./views/docs/cli/init.md?raw";
import cliSkillsInstall from "./views/docs/cli/skills/install.md?raw";

const app = new Hono<{ Bindings: Env }>();

app.use(Layout);

app.get("/", (c) => c.render(<Home />));
app.get("/blog", (c) => c.render(<Blog />));

// Registers both the rendered HTML route and its raw-markdown ({path}.md) counterpart,
// so adding a new blog post only means adding one entry here and to posts.ts.
const blogMarkdown: Record<string, string> = {
  channeling: channelingPost,
  "less-slow": lessSlowPost,
  "proxies-and-audits": proxyAndAudit,
  "log-jam": logJamPost,
  "rngo-init": rngoInitPost,
  "custom-schema-types": customSchemaTypesPost,
  "agent-skills": agentSkillsPost,
  invariants: invariantsPost,
  "goodbye-systems-hello-channels": goodbyeSystemsHelloChannelsPost,
  "rngo-skill": rngoSkill,
  "a-better-run-log": aBetterRunLog,
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

// Old "release-friday" URLs (including .md) permanently redirect to "release-notes".
app.get("/blog/release-friday/*", (c) =>
  c.redirect(c.req.path.replace("/blog/release-friday/", "/blog/release-notes/"), 301),
);

app.get("/blog/*", serveBlogMarkdown);

// Registers both the rendered HTML route and its raw-markdown ({path}.md) counterpart,
// so adding a new docs page only means adding one call here.
const docsMarkdown: Record<string, string> = {};
function docsPage(path: string, section: string, active: string, content: string) {
  docsMarkdown[path] = content;
  app.get(path, (c) => c.render(<DocPage section={section} active={active} content={content} />));
}

docsPage("/docs", "Platform", "Overview", platformOverview);
docsPage("/docs/quick-start", "Platform", "Quick Start", quickStart);
docsPage(
  "/docs/guides/initialize-your-project",
  "Platform",
  "Initialize Your Project",
  initializeYourProject,
);
docsPage("/docs/guides/write-the-spec", "Platform", "Write The Spec", writeTheSpec);
docsPage("/docs/concepts", "Platform", "Concepts", concepts);
docsPage("/docs/reference/log", "Platform", "Log", log);
docsPage("/docs/reference/expressions", "Platform", "Expressions", expressions);
docsPage("/docs/spec/channel", "Spec", "Channel", channel);
docsPage("/docs/spec/effect", "Spec", "Effect", effect);
docsPage("/docs/spec/signal", "Spec", "Signal", signal);
docsPage("/docs/spec/generator", "Spec", "Generator", generator);
docsPage("/docs/spec", "Spec", "Overview", schemaOverview);
docsPage("/docs/spec/format/sql", "Spec", "format/sql", formatSql);
docsPage("/docs/spec/format/template", "Spec", "format/template", formatTemplate);
docsPage("/docs/spec/target/exec", "Spec", "target/exec", targetExec);
docsPage("/docs/spec/target/stream", "Spec", "target/stream", targetStream);
docsPage("/docs/spec/signal/sql", "Spec", "signal/sql", signalSql);
docsPage("/docs/cli", "CLI", "Overview", cliOverview);
docsPage("/docs/cli/init", "CLI", "init", cliInit);
docsPage("/docs/cli/eval", "CLI", "eval", cliEval);
docsPage("/docs/cli/skills/install", "CLI", "skills install", cliSkillsInstall);

// Generator types are auto-discovered from worker/views/docs/spec/generator/*.md,
// so a new generator type file needs no changes here.
for (const [name, content] of Object.entries(generatorTypeMarkdown)) {
  docsMarkdown[`/docs/spec/generator/${name}`] = content;
  app.get(`/docs/spec/generator/${name}`, (c) => c.render(<GeneratorTypePage name={name} />));
}

// Old URLs (including .md) permanently redirect to their pages under "/docs/spec".
const movedDocs: Record<string, string> = {
  "/docs/cli/run": "/docs/cli/eval",
  "/docs/schema": "/docs/spec",
  "/docs/spec/schema": "/docs/spec/generator",
  "/docs/components": "/docs/spec",
  "/docs/concepts/effect": "/docs/spec/effect",
  "/docs/concepts/channel": "/docs/spec/channel",
  "/docs/concepts/signal": "/docs/spec/signal",
  "/docs/concepts/schema": "/docs/spec/generator",
  "/docs/concepts/expressions": "/docs/reference/expressions",
  "/docs/spec/expressions": "/docs/reference/expressions",
  "/docs/concepts/spec": "/docs/spec",
  "/docs/concepts/log": "/docs/reference/log",
  "/docs/concepts/simulation": "/docs/concepts#simulation",
  "/docs/concepts/proxy": "/docs/concepts#proxy",
  "/docs/concepts/audit": "/docs/concepts#audit",
};
for (const [from, to] of Object.entries(movedDocs)) {
  app.get(from, (c) => c.redirect(to, 301));
  app.get(`${from}.md`, (c) => c.redirect(`${to.split("#")[0]}.md`, 301));
}

// Old component URLs (including .md) permanently redirect under "/docs/spec", e.g.
// "/docs/schema/primitive/array", "/docs/schema/array" and "/docs/spec/schema/array" all go to
// "/docs/spec/generator/array".
const movedSections: Record<string, string> = {
  "/docs/schema/": "/docs/spec/generator/",
  "/docs/spec/schema/": "/docs/spec/generator/",
  "/docs/format/": "/docs/spec/format/",
  "/docs/target/": "/docs/spec/target/",
  "/docs/signal/": "/docs/spec/signal/",
};
for (const [from, to] of Object.entries(movedSections)) {
  app.get(`${from}*`, (c) =>
    c.redirect(c.req.path.replace(from, to).replace("/primitive/", "/"), 301),
  );
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
