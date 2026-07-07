import { createContext } from "hono/jsx";
import type { PropsWithChildren } from "hono/jsx";
import { Link, ViteClient } from "vite-ssr-components/hono";

export interface LayoutContextValue {
  appBaseUrl: string;
}

export const LayoutContext = createContext<LayoutContextValue>({
  appBaseUrl: "",
});

export function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>rngo</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Link href="/src/style.css" rel="stylesheet" />
        <ViteClient />
      </head>
      <body>{children}</body>
    </html>
  );
}
