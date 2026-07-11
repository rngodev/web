import type { PropsWithChildren } from "hono/jsx";

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

function GearIcon({ class: cls }: { class: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class={cls}
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        clip-rule="evenodd"
      />
    </svg>
  );
}

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
      <header class="sticky top-0 z-10 border-b border-stone-900/10 bg-white dark:border-stone-200/10 dark:bg-stone-900">
        {/* Top row */}
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-3">
          <div class="flex items-center gap-x-5">
            <a
              href="/docs"
              aria-current={props.section === "Platform" ? "page" : undefined}
              class="hidden lg:flex text-sm text-amber-600 dark:text-amber-400 h-full items-center font-bold"
            >
              Docs
            </a>
            <button
              type="button"
              command="show-modal"
              commandfor="docs-mobile-menu"
              class="lg:hidden p-2 -ml-2 text-stone-900/50 hover:text-stone-900 dark:text-stone-200/50 dark:hover:text-stone-200"
              aria-label="Open navigation"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
                class="size-5"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div class="flex justify-center items-center">
            <a href="/" class="flex items-center gap-x-2">
              <GearIcon class="h-7 w-7 text-amber-400" />
              <span class="text-2xl font-bold">rngo</span>
            </a>
          </div>
        </div>

        {/* Section nav row */}
        <div class="border-t border-b border-stone-900/5 bg-stone-50 dark:border-stone-200/5 dark:bg-stone-800/50">
          <nav
            class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-x-1 -mb-px"
            aria-label="Docs sections"
          >
            <SectionLink href="/docs" active={props.section} text="Platform" />
            <SectionLink href="/docs/schema" active={props.section} text="Schema" />
            <SectionLink href="/docs/cli" active={props.section} text="CLI" />
          </nav>
        </div>

        {/* Mobile drawer */}
        <el-dialog>
          <dialog
            id="docs-mobile-menu"
            class="fixed inset-0 size-auto max-h-none max-w-none overflow-hidden bg-transparent not-open:hidden backdrop:bg-transparent"
          >
            <el-dialog-backdrop class="absolute inset-0 bg-stone-900/40 dark:bg-stone-900/60 transition-opacity duration-300 ease-in-out data-closed:opacity-0" />
            <div tabindex={0} class="absolute inset-0 pr-10 focus:outline-none">
              <el-dialog-panel class="block size-full max-w-xs transform transition duration-300 ease-in-out data-closed:-translate-x-full">
                <div class="relative flex h-full flex-col overflow-y-auto bg-white dark:bg-stone-900 shadow-xl">
                  <div class="flex items-center justify-between px-6 h-16 border-b border-stone-900/10 dark:border-stone-200/10 shrink-0">
                    <div class="flex items-center gap-x-5">
                      <span class="text-sm text-amber-600 dark:text-amber-400">Docs</span>
                    </div>
                    <button
                      type="button"
                      command="close"
                      commandfor="docs-mobile-menu"
                      class="p-1 text-stone-900/40 hover:text-stone-900 dark:text-stone-200/40 dark:hover:text-stone-200"
                      aria-label="Close navigation"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        aria-hidden="true"
                        class="size-5"
                      >
                        <path
                          d="M6 18 18 6M6 6l12 12"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <nav
                    class="flex-1 px-6 py-6 overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]"
                    aria-label="Mobile sidebar"
                  >
                    <SidebarContent section={props.section} active={props.active} />
                  </nav>
                </div>
              </el-dialog-panel>
            </div>
          </dialog>
        </el-dialog>
      </header>

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
