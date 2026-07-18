import { Logo } from "../components/logo";
import { SiteHeader } from "../components/site-header";

export default function Home() {
  return (
    <div class="min-h-dvh font-mono bg-white text-stone-900 dark:bg-stone-900 dark:text-stone-200">
      <SiteHeader />

      {/* Hero */}
      <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div class="max-w-3xl">
          <h1 class="text-[14vw] sm:text-6xl lg:text-7xl font-medium leading-none tracking-tight mb-8">
            <div class="mb-8">
              <Logo class="inline h-[9vw] w-[9vw] sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-amber-400 align-bottom mr-3" />
              <b>rngo</b>
            </div>
            Learn
            <br />
            what your code
            <br />
            does.
          </h1>
          <p class="text-xl max-w-xl text-stone-900/55 dark:text-stone-200/55">
            rngo is a tool that simulates usage, <br />
            records metrics and surfaces patterns
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <a
              href="/docs"
              class="px-4 py-2.5 text-sm font-medium bg-amber-400 text-stone-900 transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
