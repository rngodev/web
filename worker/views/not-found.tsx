import { SiteHeader } from "../components/site-header";

export default function NotFound() {
  return (
    <div class="min-h-dvh font-mono bg-white text-stone-900 dark:bg-stone-900 dark:text-stone-200">
      <SiteHeader />
      <main id="main" class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24">
        <p class="text-xs uppercase tracking-widest mb-4 text-amber-700 dark:text-amber-500">404</p>
        <h1 class="text-4xl sm:text-5xl font-medium tracking-tight text-balance mb-4">
          Page not found
        </h1>
        <p class="text-lg text-pretty text-stone-900/65 dark:text-stone-200/65 mb-10">
          That page doesn't exist or has moved.
        </p>
        <nav class="flex items-center gap-x-6 text-sm" aria-label="Suggested pages">
          <a href="/docs" class="text-amber-700 dark:text-amber-400 hover:opacity-80">
            Read the docs
          </a>
          <a href="/blog" class="text-amber-700 dark:text-amber-400 hover:opacity-80">
            Read the blog
          </a>
          <a href="/" class="text-amber-700 dark:text-amber-400 hover:opacity-80">
            Go home
          </a>
        </nav>
      </main>
    </div>
  );
}
