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
// The export occasionally dies midway; retry once, and never leave a partial dist/play to commit.
for (let attempt = 1; ; attempt++) {
  rmSync(out, { recursive: true, force: true });
  try {
    execSync(`pnpm exec expo export --platform web --output-dir "${out}" --clear`, {
      cwd: frontend,
      stdio: "inherit",
      env: { ...process.env, HIDEYA_WEB_BASE_PATH: "/hideya/play", NODE_ENV: "production" },
    });
  } catch {}
  if (existsSync(resolve(out, "index.html")) && existsSync(resolve(out, "_expo/static/js/web"))) break;
  if (attempt === 2) {
    console.error("build-play: export failed twice; dist/play is incomplete. Do not commit it.");
    process.exit(1);
  }
  console.log("build-play: export incomplete, retrying.");
}
