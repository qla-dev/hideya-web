// Exports the Expo app for the browser into dist/play, served as
// https://qla.dev/hideya/play: guest play only (sign-in is native-only).
// Needs the sibling frontend/ checkout; the committed dist/ is what deploys.
import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const frontend = resolve("../frontend");
const out = resolve("dist/play");
if (!existsSync(resolve(frontend, "package.json"))) {
  console.log("build-play: ../frontend not found, keeping the committed dist/play.");
  process.exit(0);
}
rmSync(out, { recursive: true, force: true });
execSync(`pnpm exec expo export --platform web --output-dir "${out}" --clear`, {
  cwd: frontend,
  stdio: "inherit",
  env: { ...process.env, HIDEYA_WEB_BASE_PATH: "/hideya/play", NODE_ENV: "production" },
});
