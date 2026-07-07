import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/hello", (c) => c.json({ message: "Hello from Hono on Cloudflare Workers!" }));

export default app;
