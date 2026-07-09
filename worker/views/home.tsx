import { useContext } from "hono/jsx";
import { Camera, CursorArrowRipple, Variable } from "@/components/heroicons/solid";
import { LayoutContext } from "@/layout";

export default function Home() {
  const context = useContext(LayoutContext);

  return (
    <div class="min-h-dvh font-mono bg-white text-stone-900 dark:bg-stone-900 dark:text-stone-200">
      {/* Nav */}
      <header class="border-b border-stone-900/10 dark:border-stone-200/10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-3 items-center">
          <div>
            <a
              href="/docs"
              class="text-sm text-stone-900/50 transition-colors hover:text-stone-900 dark:text-stone-200/50 dark:hover:text-stone-200"
            >
              Docs
            </a>
          </div>
          <div class="flex justify-center">
            <a href="/" class="flex items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-7 w-7 text-amber-400"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-2xl font-bold">rngo</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div class="max-w-3xl">
          <p class="text-xs uppercase tracking-widest mb-6 text-amber-600">
            an end-to-end testing platform
          </p>
          <h1 class="text-[14vw] sm:text-6xl lg:text-7xl font-medium leading-none tracking-tight mb-8">
            <span class="whitespace-nowrap">Compared to</span>
            <br />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="inline h-[9vw] w-[9vw] sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-amber-400 align-bottom mr-3"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                clip-rule="evenodd"
              />
            </svg>
            <b>rngo</b>
            ,
            <br />
            production
            <br />
            is easy
          </h1>
          <p class="text-l max-w-xl text-stone-900/55 dark:text-stone-200/55">
            <b>Give your code some tough love.</b> rngo runs your entire environment through a
            gauntlet of tests custom-designed to expose weakpoints.
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <a
              href="/docs"
              class="px-4 py-2.5 text-sm font-medium bg-amber-400 text-stone-900 transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
            <a
              href={`${context.appBaseUrl}/sign-in`}
              class="text-sm text-stone-900/50 transition-colors hover:text-stone-900 dark:text-stone-200/50 dark:hover:text-stone-200"
            >
              Sign In →
            </a>
          </div>
        </div>
      </section>

      {/* Three testing modes */}
      <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div class="flex flex-col gap-px">
          <div class="p-10 sm:p-12 bg-white dark:bg-stone-900 flex items-start gap-6">
            <Variable class="size-8 text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 class="text-2xl font-medium mb-4">End-to-End Property Tests</h2>
              <p class="text-sm leading-relaxed text-stone-900/55 dark:text-stone-200/55">
                Exhaustively searches for combinations of system state and interface interactions
                that result in behavior in violation of user-defined invariants.
              </p>
            </div>
          </div>

          <div class="p-10 sm:p-12 bg-white dark:bg-stone-900 flex items-start gap-6">
            <Camera class="size-8 text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 class="text-2xl font-medium mb-4">Dynamic Snapshot Tests</h2>
              <p class="text-sm leading-relaxed text-stone-900/55 dark:text-stone-200/55">
                Automatically captures UI screenshots and API responses, then flags changes on
                subsequent runs. Since runs are deterministic, snapshot tests can even detect
                regressions in dynamic data.
              </p>
            </div>
          </div>

          <div class="p-10 sm:p-12 bg-white dark:bg-stone-900 flex items-start gap-6">
            <CursorArrowRipple class="size-8 text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 class="text-2xl font-medium mb-4">Streamlined Manual Tests</h2>
              <p class="text-sm leading-relaxed text-stone-900/55 dark:text-stone-200/55">
                Produces manual testing plans that skip the overhead of scenario setup and fixtures,
                enabling testers to focus on verifying behavior and visuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="border-t border-stone-900/10 dark:border-stone-200/10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex items-center justify-between">
          <p class="text-xs text-stone-900/30 dark:text-stone-200/30">© 2026 rngo</p>
          <nav class="flex items-center gap-x-6 text-xs text-stone-900/30 dark:text-stone-200/30">
            <a
              href="/docs"
              class="transition-colors hover:text-stone-900/60 dark:hover:text-stone-200/60"
            >
              docs
            </a>
            <a
              href="https://github.com/rngodev"
              class="transition-colors hover:text-stone-900/60 dark:hover:text-stone-200/60"
            >
              github
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
