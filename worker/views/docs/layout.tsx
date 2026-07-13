import type { PropsWithChildren } from "hono/jsx";
import { SiteHeader } from "../../components/site-header";

// ─── Typography components ────────────────────────────────────────────────────

export function H1({ children }: { children: any }) {
  return <h1 class="text-3xl font-medium tracking-tight mb-4">{children}</h1>;
}

export function H2({ children }: { children: any }) {
  return <h2 class="text-xl font-medium tracking-tight mt-10 mb-3">{children}</h2>;
}

export function H3({ children }: { children: any }) {
  return <h3 class="text-base font-medium tracking-tight mt-8 mb-2">{children}</h3>;
}

export function P({ children }: { children: any }) {
  return (
    <p class="text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 mb-4">{children}</p>
  );
}

export function A({ href, children }: { href: string; children: any }) {
  return (
    <a href={href} class="text-amber-600 dark:text-amber-400 transition-opacity hover:opacity-80">
      {children}
    </a>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre class="bg-stone-900 dark:bg-stone-800 text-stone-200 text-xs leading-relaxed p-5 overflow-x-auto mb-6 rounded-sm">
      <code>{children}</code>
    </pre>
  );
}

export function InlineCode({ children }: { children: any }) {
  return (
    <code class="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-stone-800 px-1.5 py-0.5 text-xs rounded-sm">
      {children}
    </code>
  );
}

export function Divider() {
  return <hr class="border-stone-900/10 dark:border-stone-200/10 my-8" />;
}

export function UL({ children }: { children: any }) {
  return (
    <ul class="text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 list-disc list-outside ml-4 mb-4 space-y-1">
      {children}
    </ul>
  );
}

export function OL({ children }: { children: any }) {
  return (
    <ol class="text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 list-decimal list-outside ml-4 mb-4 space-y-1">
      {children}
    </ol>
  );
}

export function LI({ children }: { children: any }) {
  return <li class="leading-relaxed">{children}</li>;
}

export function DL({ children }: { children: any }) {
  return <dl class="text-sm leading-relaxed mb-4 space-y-3">{children}</dl>;
}

export function DT({ children }: { children: any }) {
  return <dt class="font-medium text-stone-900 dark:text-stone-200">{children}</dt>;
}

export function DD({ children }: { children: any }) {
  return <dd class="text-stone-900/70 dark:text-stone-200/70 ml-4">{children}</dd>;
}

export function Blockquote({ children }: { children: any }) {
  return (
    <blockquote class="border-l-2 border-amber-400 pl-4 text-sm leading-relaxed text-stone-900/70 dark:text-stone-200/70 mb-4 italic">
      {children}
    </blockquote>
  );
}

export function RequiredAttributeHeader({ children }: { children: string }) {
  return (
    <div class="mt-8 mb-2 flex items-center gap-2">
      <InlineCode>{children}</InlineCode>
      <span class="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded-sm">
        required
      </span>
    </div>
  );
}

export function OptionalAttributeHeader({ children }: { children: string }) {
  return (
    <div class="mt-8 mb-2 flex items-center gap-2">
      <InlineCode>{children}</InlineCode>
      <span class="text-xs bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400 px-1.5 py-0.5 rounded-sm">
        optional
      </span>
    </div>
  );
}

// ─── Navigation helpers ───────────────────────────────────────────────────────

function SectionLink(props: { href: string; active: string; text: string }) {
  const isActive = props.active === props.text;
  return (
    <a
      href={props.href}
      aria-current={isActive ? "page" : undefined}
      class={`px-3 py-2.5 text-sm border-b-2 transition-colors ${
        isActive
          ? "border-stone-900 text-stone-900 dark:border-stone-200 dark:text-stone-200"
          : "border-transparent text-stone-900/50 dark:text-stone-200/50 hover:text-stone-900 dark:hover:text-stone-200"
      }`}
    >
      {props.text}
    </a>
  );
}

function SidebarGroup(props: PropsWithChildren<{ title?: string }>) {
  return (
    <div class="mb-6">
      {props.title && (
        <p class="text-xs uppercase tracking-widest mb-2 text-amber-600">{props.title}</p>
      )}
      <ul class="space-y-0.5">{props.children}</ul>
    </div>
  );
}

function SidebarLink(props: { href: string; active: string; text: string }) {
  const isActive = props.active === props.text;
  return (
    <li>
      <a
        href={props.href}
        aria-current={isActive ? "page" : undefined}
        class={`block px-2 py-1.5 text-sm rounded-sm transition-colors ${
          isActive
            ? "text-stone-900 dark:text-stone-200 bg-stone-900/5 dark:bg-stone-200/10"
            : "text-stone-900/55 dark:text-stone-200/55 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-900/5 dark:hover:bg-stone-200/5"
        }`}
      >
        {props.text}
      </a>
    </li>
  );
}

// ─── Section-specific sidebar content ────────────────────────────────────────

function PlatformSidebar({ active }: { active: string }) {
  return (
    <>
      <SidebarGroup>
        <SidebarLink href="/docs" active={active} text="Overview" />
      </SidebarGroup>
      <SidebarGroup title="Guides">
        <SidebarLink href="/docs/guides/quick-start" active={active} text="Quick Start" />
        <SidebarLink href="/docs/guides/initialize" active={active} text="Initialize" />
      </SidebarGroup>
      <SidebarGroup title="Concepts">
        <SidebarLink href="/docs/concepts/simulation" active={active} text="Simulation" />
        <SidebarLink href="/docs/concepts/system" active={active} text="System" />
        <SidebarLink href="/docs/concepts/effect" active={active} text="Effect" />
        <SidebarLink href="/docs/concepts/schema" active={active} text="Schema" />
      </SidebarGroup>
    </>
  );
}

function SchemaSidebar({ active }: { active: string }) {
  return (
    <>
      <SidebarGroup>
        <SidebarLink href="/docs/schema" active={active} text="Overview" />
      </SidebarGroup>
      <SidebarGroup title="primitive">
        <SidebarLink href="/docs/schema/array" active={active} text="array" />
        <SidebarLink href="/docs/schema/constant" active={active} text="constant" />
        <SidebarLink href="/docs/schema/context" active={active} text="context" />
        <SidebarLink href="/docs/schema/function" active={active} text="function" />
        <SidebarLink href="/docs/schema/number" active={active} text="number" />
        <SidebarLink href="/docs/schema/object" active={active} text="object" />
        <SidebarLink href="/docs/schema/reference" active={active} text="reference" />
        <SidebarLink href="/docs/schema/select" active={active} text="select" />
        <SidebarLink href="/docs/schema/string" active={active} text="string" />
      </SidebarGroup>
    </>
  );
}

function CliSidebar({ active }: { active: string }) {
  return (
    <>
      <SidebarGroup>
        <SidebarLink href="/docs/cli" active={active} text="Overview" />
      </SidebarGroup>
      <SidebarGroup title="Commands">
        <SidebarLink href="/docs/cli/init" active={active} text="init" />
        <SidebarLink href="/docs/cli/run" active={active} text="run" />
      </SidebarGroup>
    </>
  );
}

function SidebarContent({ section, active }: { section: string; active: string }) {
  if (section === "Schema") return <SchemaSidebar active={active} />;
  if (section === "CLI") return <CliSidebar active={active} />;
  return <PlatformSidebar active={active} />;
}

// ─── Layout ───────────────────────────────────────────────────────────────────

type DocsLayoutProps = PropsWithChildren<{
  section: string;
  active: string;
}>;

export function DocsLayout(props: DocsLayoutProps) {
  return (
    <div class="min-h-dvh font-mono bg-white text-stone-900 dark:bg-stone-900 dark:text-stone-200">
      {/* Header */}
      <div class="sticky top-0 z-10 bg-white dark:bg-stone-900">
        <SiteHeader active="docs">
          <SidebarContent section={props.section} active={props.active} />
        </SiteHeader>

        {/* Section nav row */}
        <div class="border-b border-stone-900/5 bg-stone-50 dark:border-stone-200/5 dark:bg-stone-800/50">
          <nav
            class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-x-1 -mb-px overflow-x-auto"
            aria-label="Docs sections"
          >
            <SectionLink href="/docs" active={props.section} text="Platform" />
            <SectionLink href="/docs/schema" active={props.section} text="Schema" />
            <SectionLink href="/docs/cli" active={props.section} text="CLI" />
          </nav>
        </div>
      </div>

      {/* Body */}
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex gap-x-12 py-10">
        {/* Sidebar */}
        <aside class="hidden lg:block w-48 shrink-0">
          <nav aria-label="Sidebar">
            <SidebarContent section={props.section} active={props.active} />
          </nav>
        </aside>

        {/* Main content */}
        <main class="flex-1 min-w-0 max-w-2xl">{props.children}</main>
      </div>
    </div>
  );
}
