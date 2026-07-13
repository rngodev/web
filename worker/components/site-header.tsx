import type { PropsWithChildren } from "hono/jsx";
import { Logo } from "./logo";

type SiteHeaderProps = PropsWithChildren<{
  active?: "docs" | "blog";
}>;

function NavLink({
  href,
  current,
  children,
}: PropsWithChildren<{ href: string; current: boolean }>) {
  return (
    <a
      href={href}
      aria-current={current ? "page" : undefined}
      class={`text-sm transition-colors ${
        current
          ? "text-amber-600 dark:text-amber-400"
          : "text-stone-900/50 hover:text-stone-900 dark:text-stone-200/50 dark:hover:text-stone-200"
      }`}
    >
      {children}
    </a>
  );
}

function DrawerLink({
  href,
  current,
  children,
}: PropsWithChildren<{ href: string; current: boolean }>) {
  return (
    <li>
      <a
        href={href}
        aria-current={current ? "page" : undefined}
        class={`block px-2 py-1.5 text-sm rounded-sm transition-colors ${
          current
            ? "text-stone-900 dark:text-stone-200 bg-stone-900/5 dark:bg-stone-200/10"
            : "text-stone-900/55 dark:text-stone-200/55 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-900/5 dark:hover:bg-stone-200/5"
        }`}
      >
        {children}
      </a>
    </li>
  );
}

export function SiteHeader({ active, children }: SiteHeaderProps) {
  return (
    <header class="border-b border-stone-900/10 dark:border-stone-200/10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-3 items-center">
        <div class="flex items-center gap-x-5">
          <nav class="hidden lg:flex items-center gap-x-5" aria-label="Site">
            <NavLink href="/docs" current={active === "docs"}>
              Docs
            </NavLink>
            <NavLink href="/blog" current={active === "blog"}>
              Blog
            </NavLink>
          </nav>
          <button
            type="button"
            command="show-modal"
            commandfor="site-mobile-menu"
            class="lg:hidden flex items-center gap-x-2 py-2 pr-3 pl-2 -ml-2 text-stone-900/50 hover:text-stone-900 dark:text-stone-200/50 dark:hover:text-stone-200"
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
            {active && (
              <span class="text-sm text-amber-600 dark:text-amber-400">
                {active === "docs" ? "Docs" : "Blog"}
              </span>
            )}
          </button>
        </div>
        <div class="flex justify-center">
          <a href="/" aria-label="Homepage" class="flex items-center gap-x-2">
            <Logo class="h-7 w-7 text-amber-400" />
            <span class="text-2xl font-bold">rngo</span>
          </a>
        </div>
      </div>

      {/* Mobile drawer */}
      <el-dialog>
        <dialog
          id="site-mobile-menu"
          class="fixed inset-0 size-auto max-h-none max-w-none overflow-hidden bg-transparent not-open:hidden backdrop:bg-transparent"
        >
          <el-dialog-backdrop class="absolute inset-0 bg-stone-900/40 dark:bg-stone-900/60 transition-opacity duration-300 ease-in-out data-closed:opacity-0" />
          <div tabindex={0} class="absolute inset-0 pr-10 focus:outline-none">
            <el-dialog-panel class="block size-full max-w-xs transform transition duration-300 ease-in-out data-closed:-translate-x-full">
              <div class="relative flex h-full flex-col overflow-y-auto bg-white dark:bg-stone-900 shadow-xl">
                <div class="flex items-center justify-between px-6 h-16 border-b border-stone-900/10 dark:border-stone-200/10 shrink-0">
                  <a href="/" aria-label="Homepage" class="flex items-center gap-x-2">
                    <Logo class="h-6 w-6 text-amber-400" />
                    <span class="text-lg font-bold">rngo</span>
                  </a>
                  <button
                    type="button"
                    command="close"
                    commandfor="site-mobile-menu"
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
                  aria-label="Mobile site nav"
                >
                  <ul class="space-y-0.5">
                    <DrawerLink href="/docs" current={active === "docs"}>
                      Docs
                    </DrawerLink>
                    <DrawerLink href="/blog" current={active === "blog"}>
                      Blog
                    </DrawerLink>
                  </ul>
                  {children && (
                    <div class="mt-6 pt-6 border-t border-stone-900/10 dark:border-stone-200/10">
                      {children}
                    </div>
                  )}
                </nav>
              </div>
            </el-dialog-panel>
          </div>
        </dialog>
      </el-dialog>
    </header>
  );
}
