import { createContext } from "hono/jsx";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Seo } from "./components/seo";
import { Link, Script, ViteClient } from "vite-ssr-components/hono";

export interface LayoutContextValue {
  appBaseUrl: string;
}

export const LayoutContext = createContext<LayoutContextValue>({
  appBaseUrl: "",
});

const layout = jsxRenderer(({ children, seo }) => {
  const c = useRequestContext<{
    Bindings: Env;
  }>();

  return (
    <html lang="en" class="h-full bg-white dark:bg-gray-900">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1c1917" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {seo && <Seo {...seo} />}
        <ViteClient />
        <Link href="/src/style.css" rel="stylesheet" />
        <Script src="/src/main.ts" type="module" />
      </head>
      <body class="h-full">
        <a
          href="#main"
          class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-amber-400 focus:px-4 focus:py-2 focus:text-sm focus:text-stone-900"
        >
          Skip to content
        </a>
        <LayoutContext.Provider value={{ appBaseUrl: c.env.APP_BASE_URL }}>
          {children}
        </LayoutContext.Provider>
      </body>
    </html>
  );
});

export default layout;
