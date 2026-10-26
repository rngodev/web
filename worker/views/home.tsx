import { SiteHeader } from "../components/site-header";

function Footer() {
  return (
    <footer class="border-t border-stone-900/10 dark:border-stone-200/10 mt-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex items-center justify-between">
        <p class="text-xs text-stone-900/30 dark:text-stone-200/30">© 2026 rngo</p>
        <nav class="flex items-center gap-x-6 text-xs text-stone-900/30 dark:text-stone-200/30">
          <a
            href="/docs"
            class="transition-colors hover:text-stone-900/60 dark:hover:text-stone-200/60"
          >
            Docs
          </a>
          <a
            href="/blog"
            class="transition-colors hover:text-stone-900/60 dark:hover:text-stone-200/60"
          >
            Blog
          </a>
          <a
            href="https://github.com/rngodev"
            class="transition-colors hover:text-stone-900/60 dark:hover:text-stone-200/60"
          >
            Code
          </a>
        </nav>
      </div>
    </footer>
  );
}

const panel = "border border-stone-900/10 dark:border-stone-100/10 bg-white dark:bg-stone-800/40";
const panelHeader =
  "px-4 h-10 flex items-center justify-between border-b border-stone-900/10 dark:border-stone-100/10 text-xs text-stone-900/45 dark:text-stone-100/45";

const sections = [
  {
    title: "Channels",
    href: "/docs/spec/channel",
    body: "A channel specifies how to send formatted inputs to and receive outputs from an interface in your system.",
    file: "spec.yml",
    code: "channels:\n  db:\n    type: stream\n    command: sqlite3 db.sqlite\n    format:\n      type: sql\n  api:\n    type: exec\n    format:\n      type: template\n      template: >-\n        curl -sS -X {{data.method}}\n        \"${API_BASE_URL:-http://localhost:5173}{{{data.path}}}\"\n        {{#if data.body}}\n        -H 'Content-Type: application/json'\n        --data '{{json data.body}}'\n        {{/if}}",
  },
  {
    title: "Effects",
    href: "/docs/spec/effect",
    body: "An effect defines a stream of inputs, which are randomly-generated JSON values with logical (possibly backdated) timestamps.",
    file: "spec.yml",
    code: "effects:\n  users.create:\n    trigger: hz(100, day)\n    start: now - years(2)\n    channel: db\n    metadata:\n      table: USERS\n    generator:\n      type: object\n      properties:\n        id:\n          type: number\n          minimum: 1\n          scale: 0\n          step: 1\n        name:\n          type: string\n          pattern: .{2,64}\n        email:\n          type: function\n          expression: \"'user' + number + '@example.com'\"\n          variables:\n            number:\n              type: number\n              minimum: 10000\n              maximum: 99999\n              scale: 0\n  articles.post:\n    # \u2026",
  },
  {
    title: "Signals",
    href: "/docs/spec/signal",
    body: "A signal is a SQL query over every channel's inputs and outputs, along with an expected result.",
    file: "spec.yml",
    code: "signals:\n  api-minimum-title-length:\n    type: sql\n    query: >\n      SELECT count(*)\n      FROM outputs o\n        JOIN inputs i ON o.input_id = i.id\n      WHERE i.effect = 'articles.post'\n      AND length(i.data ->> '$.title') < 10\n      AND o.data NOT LIKE '%422 Unprocessable Content%';\n    expect: result == 0\n  api-no-server-errors:\n    type: sql\n    query: >\n      SELECT count(*) FROM outputs\n      WHERE channel = 'api' AND data LIKE '%500%';\n    expect: result == 0\n  log-minimal-errors:\n    type: sql\n    query: >\n      SELECT count(*) FROM outputs\n      WHERE channel = 'log' AND data LIKE 'ERROR%';\n    expect: result < 20",
  },
];

// Illustrative eval run: three services, each with an api and its own database, plus logs.
const evalChannels = [
  { name: "auth-api", inputs: 18342, outputs: 18342 },
  { name: "auth-postgres", inputs: 9120, outputs: 0 },
  { name: "inventory-api", inputs: 25610, outputs: 25610 },
  { name: "inventory-mysql", inputs: 14288, outputs: 0 },
  { name: "order-api", inputs: 12907, outputs: 12907 },
  { name: "order-dynamo", inputs: 12907, outputs: 0 },
  { name: "logs", inputs: 0, outputs: 412880 },
];

const evalSignals = [
  { name: "auth-unique-emails", result: 0, passed: true },
  { name: "auth-no-server-errors", result: 0, passed: true },
  { name: "auth-session-expiry-enforced", result: 0, passed: true },
  { name: "inventory-no-negative-stock", result: 0, passed: true },
  { name: "inventory-sku-unique", result: 0, passed: true },
  { name: "inventory-no-server-errors", result: 0, passed: true },
  { name: "order-total-matches-items", result: 0, passed: true },
  { name: "order-no-duplicate-charges", result: 2, passed: false },
  { name: "order-no-server-errors", result: 0, passed: true },
  { name: "order-reserves-inventory", result: 0, passed: true },
  { name: "logs-minimal-errors", result: 31, passed: false },
];

function Terminal() {
  const time = new Date().toISOString().slice(0, 19).replace("T", " ");
  const nameWidth = Math.max(...evalChannels.map((c) => c.name.length)) + 2;
  const passed = evalSignals.filter((signal) => signal.passed).length;
  const failed = evalSignals.length - passed;

  return (
    <div class="border border-stone-200/10 bg-stone-950 text-stone-200 text-sm">
      <div class="px-4 h-10 flex items-center gap-x-2 border-b border-stone-200/10">
        <span class="size-2.5 rounded-full bg-stone-200/15" />
        <span class="size-2.5 rounded-full bg-stone-200/15" />
        <span class="size-2.5 rounded-full bg-stone-200/15" />
        <span class="ml-3 text-xs text-stone-200/35">shop</span>
      </div>
      <pre class="p-4 leading-6 overflow-x-auto">
        <span class="text-amber-400">$</span> rngo eval{"\n\n"}
        <span class="text-stone-200/55">Simulation</span>
        {`\ntime: ${time}\n`}
        {evalChannels.map(
          (c) => `${`${c.name}:`.padEnd(nameWidth)}${c.inputs} inputs, ${c.outputs} outputs\n`,
        )}
        {"\n"}
        <span class="text-stone-200/55">Audit</span>
        {"\n"}
        {evalSignals.map((signal) => (
          <>
            {`${signal.name}: ${signal.result} `}
            <span class={signal.passed ? "text-emerald-400" : "text-rose-400"}>
              {signal.passed ? "(passed)" : "(failed)"}
            </span>
            {"\n"}
          </>
        ))}
        {"\n"}
        <span class="text-emerald-400">{passed} passed</span>
        {failed > 0 && (
          <>
            , <span class="text-rose-400">{failed} failed</span>
          </>
        )}
      </pre>
    </div>
  );
}

export default function Home() {
  return (
    <div class="min-h-dvh font-mono bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-100">
      <SiteHeader />

      <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 grid lg:grid-cols-2 gap-x-16 gap-y-16 items-start lg:items-center">
        <div>
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight">
            Learn what your code does.
          </h1>
          <p class="mt-10 text-xl max-w-xl text-stone-900/65 dark:text-stone-100/65">
            rngo is a dynamic code analyzer that simulates usage, records everything and surfaces
            patterns
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <a
              href="/docs"
              class="px-5 py-3 text-sm font-medium bg-amber-400 text-stone-900 transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
          </div>
        </div>
        <Terminal />
      </section>

      <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 border-t border-stone-900/15 dark:border-stone-100/15">
        <h2 class="text-3xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
          Meet the rngo spec
        </h2>
        <p class="mt-6 text-xl max-w-2xl text-stone-900/65 dark:text-stone-100/65">
          A declarative description of a system's behavior, in terms of a <b>channels</b>,{" "}
          <b>effects</b> and <b>signals</b>. The channels and effects model realistic usage while
          the signals set expectations for observed behavior.
        </p>
      </section>

      <ol class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {sections.map((section, i) => (
          <li class="py-16 grid lg:grid-cols-2 gap-x-16 gap-y-10 items-start">
            <div>
              <span class="text-xs text-amber-700 dark:text-amber-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 class="mt-3 text-4xl font-medium">{section.title}</h2>
              <p class="mt-4 text-lg max-w-md text-stone-900/60 dark:text-stone-100/60">
                {section.body}
              </p>
              <a
                href={section.href}
                class="mt-6 inline-block text-sm text-amber-700 dark:text-amber-400 underline underline-offset-4 decoration-current/30 hover:decoration-current"
              >
                Read about {section.title.toLowerCase()} →
              </a>
            </div>
            <div class={`${panel} text-sm`}>
              <div class={panelHeader}>{section.file}</div>
              <pre class="p-4 leading-6 overflow-x-auto">{section.code}</pre>
            </div>
          </li>
        ))}
      </ol>

      <Footer />
    </div>
  );
}
