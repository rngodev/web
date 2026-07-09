import { createContext } from "hono/jsx";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";

export interface LayoutContextValue {
  appBaseUrl: string;
}

export const LayoutContext = createContext<LayoutContextValue>({
  appBaseUrl: "",
});

const layout = jsxRenderer(({ children }) => {
  const c = useRequestContext<{
    Bindings: Env;
  }>();

  return (
    <html class="h-full bg-white dark:bg-gray-900">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ViteClient />
        <Link href="/src/style.css" rel="stylesheet" />
      </head>
      <body class="h-full">
        <LayoutContext.Provider value={{ appBaseUrl: c.env.APP_BASE_URL }}>
          {children}
        </LayoutContext.Provider>
      </body>
    </html>
  );
});

export default layout;
