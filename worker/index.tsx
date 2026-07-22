import { Hono, type Context } from "hono";
import Layout from "./layout";
import Home from "./views/home";
import Blog from "./views/blog";
import RngoInit from "./views/blog/posts/release-friday/rngo-init";
import { DocPage } from "./views/docs/page";
import { primitiveMarkdown, PrimitivePage } from "./views/docs/schema/primitive/page";
import CustomSchemaTypes from "./views/blog/posts/release-friday/custom-schema-types";

import platformOverview from "./views/docs/platform/overview.md?raw";
import schemaOverview from "./views/docs/schema/overview.md?raw";
import cliOverview from "./views/docs/cli/overview.md?raw";
import quickStart from "./views/docs/platform/guides/quick-start.md?raw";
import initialize from "./views/docs/platform/guides/initialize.md?raw";
import simulation from "./views/docs/platform/concepts/simulation.md?raw";
import system from "./views/docs/platform/concepts/system.md?raw";
import effect from "./views/docs/platform/concepts/effect.md?raw";
import schema from "./views/docs/platform/concepts/schema.md?raw";
import cliRun from "./views/docs/cli/run.md?raw";
import cliInit from "./views/docs/cli/init.md?raw";

const app = new Hono<{ Bindings: Env }>();

app.use(Layout);

app.get("/", (c) => c.render(<Home />));
app.get("/blog", (c) => c.render(<Blog />));
app.get("/blog/release-friday/rngo-init", (c) => c.render(<RngoInit />));
app.get("/blog/release-friday/custom-schema-types", (c) => c.render(<CustomSchemaTypes />));

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
docsPage("/docs/concepts/simulation", "Platform", "Simulation", simulation);
docsPage("/docs/concepts/system", "Platform", "System", system);
docsPage("/docs/concepts/effect", "Platform", "Effect", effect);
docsPage("/docs/concepts/schema", "Platform", "Schema", schema);
docsPage("/docs/schema", "Schema", "Overview", schemaOverview);
docsPage("/docs/cli", "CLI", "Overview", cliOverview);
docsPage("/docs/cli/init", "CLI", "init", cliInit);
docsPage("/docs/cli/run", "CLI", "run", cliRun);

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
