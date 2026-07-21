// Regenerates the primitive schema type references and linked index in
// skills/{rngo-custom-schema-type,rngo-effect-inference}/ from
// worker/views/docs/schema/primitive/*.md sources. Each skill gets its own
// copy of references/*.md so it stays self-contained (usable as a standalone
// package, no cross-skill file refs).
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { marked } from "marked";

const root = fileURLToPath(new URL("..", import.meta.url));
const primitivesDir = path.join(root, "worker/views/docs/schema/primitive");

const skillDirs = [
  path.join(root, "skills/rngo-custom-schema-type"),
  path.join(root, "skills/rngo-effect-inference"),
];

function extract(mdPath) {
  const raw = readFileSync(mdPath, "utf8");
  const tokens = marked.lexer(raw);

  const h1 = tokens.find((t) => t.type === "heading" && t.depth === 1);
  if (!h1 || h1.type !== "heading") return null;

  const h1Index = tokens.indexOf(h1);
  const description = tokens.slice(h1Index + 1).find((t) => t.type === "paragraph");
  if (!description || description.type !== "paragraph") return null;

  // First sentence only, so multi-sentence page intros don't bloat the SKILL.md index.
  const summary = description.text.split(/(?<=\.)\s+/)[0];

  return { name: h1.text, summary, content: raw };
}

const entries = new Map();
for (const file of readdirSync(primitivesDir)) {
  if (!file.endsWith(".md")) continue;
  const entry = extract(path.join(primitivesDir, file));
  if (entry) entries.set(entry.name, entry);
}

for (const skillDir of skillDirs) {
  const referencesDir = path.join(skillDir, "references");
  mkdirSync(referencesDir, { recursive: true });
  for (const [name, { content }] of entries) {
    writeFileSync(path.join(referencesDir, `${name}.md`), content);
  }

  const skillPath = path.join(skillDir, "SKILL.md");
  let skill = readFileSync(skillPath, "utf8");

  for (const [name, { summary }] of entries) {
    const indexLine = new RegExp(`^- \\[\`${name}\`\\]\\(references/${name}\\.md\\) — .*$`, "m");
    if (!indexLine.test(skill)) {
      console.warn(`No existing index line for \`${name}\` found in ${skillPath}, skipping`);
      continue;
    }
    skill = skill.replace(indexLine, `- [\`${name}\`](references/${name}.md) — ${summary}`);
  }

  writeFileSync(skillPath, skill);
}

console.log(
  `Regenerated ${entries.size} entr${entries.size === 1 ? "y" : "ies"} for ${skillDirs.length} skills:`,
  [...entries.keys()],
);
