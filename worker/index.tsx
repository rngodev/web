import { Hono } from "hono";
import Layout from "./layout";
import Home from "./views/home";
import PlatformOverview from "./views/docs/platform/overview";
import SchemaOverview from "./views/docs/schema/overview";
import CliOverview from "./views/docs/cli/overview";
import QuickStart from "./views/docs/platform/guides/quick-start";
import Simulation from "./views/docs/platform/concepts/simulation";
import System from "./views/docs/platform/concepts/system";
import Effect from "./views/docs/platform/concepts/effect";
import Schema from "./views/docs/platform/concepts/schema";
import Array from "./views/docs/schema/array";
import Constant from "./views/docs/schema/constant";
import Context from "./views/docs/schema/context";
import Function from "./views/docs/schema/function";
import Number from "./views/docs/schema/number";
import Object from "./views/docs/schema/object";
import Reference from "./views/docs/schema/reference";
import Select from "./views/docs/schema/select";
import String from "./views/docs/schema/string";
import SimRun from "./views/docs/cli/sim/run";

const app = new Hono<{ Bindings: Env }>();

app.use(Layout);

app.get("/", (c) => c.render(<Home />));
app.get("/docs", (c) => c.render(<PlatformOverview />));
app.get("/docs/guides/quick-start", (c) => c.render(<QuickStart />));
app.get("/docs/concepts/simulation", (c) => c.render(<Simulation />));
app.get("/docs/concepts/system", (c) => c.render(<System />));
app.get("/docs/concepts/effect", (c) => c.render(<Effect />));
app.get("/docs/concepts/schema", (c) => c.render(<Schema />));
app.get("/docs/schema", (c) => c.render(<SchemaOverview />));
app.get("/docs/schema/array", (c) => c.render(<Array />));
app.get("/docs/schema/constant", (c) => c.render(<Constant />));
app.get("/docs/schema/context", (c) => c.render(<Context />));
app.get("/docs/schema/function", (c) => c.render(<Function />));
app.get("/docs/schema/number", (c) => c.render(<Number />));
app.get("/docs/schema/object", (c) => c.render(<Object />));
app.get("/docs/schema/reference", (c) => c.render(<Reference />));
app.get("/docs/schema/select", (c) => c.render(<Select />));
app.get("/docs/schema/string", (c) => c.render(<String />));
app.get("/docs/cli", (c) => c.render(<CliOverview />));
app.get("/docs/cli/sim/run", (c) => c.render(<SimRun />));

export default app;
