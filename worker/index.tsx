import { Hono } from "hono";
import { Layout, LayoutContext } from "./layout";
import Home from "./views/home";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/hello", (c) => c.json({ message: "Hello from Hono on Cloudflare Workers!" }));

app.get("/", (c) =>
  c.html(
    <Layout>
      <LayoutContext.Provider value={{ appBaseUrl: c.env.APP_BASE_URL }}>
        <Home />
      </LayoutContext.Provider>
    </Layout>,
  ),
);

export default app;
