// The Tailwind Plus elements only power the mobile navigation dialog, so load them once the
// page is idle instead of blocking first render on ~80 KB of script.
const load = () => import("@tailwindplus/elements");

if ("requestIdleCallback" in window) {
  requestIdleCallback(load);
} else {
  setTimeout(load, 200);
}
