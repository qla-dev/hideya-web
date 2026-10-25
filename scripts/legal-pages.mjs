// Builds Hideya's legal pages (privacy, terms, cookies) into public/, so Vite
// copies them to dist/ and they are served at https://qla.dev/hideya/<page>.
// Edit the copy here, then run `pnpm legal` (also part of `pnpm build`).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "../public");
const updated = "25 October 2026";

const pages = {
  privacy: {
    title: "Privacy policy",
    body: `
<p>Hideya is a hide-and-seek game played outside with friends. It is made by qla.dev. This policy explains what the app and its server handle, why, and who sees it.</p>
<h2>What we handle</h2>
<ul>
<li><strong>Your game name</strong> and your picks (hunter, runner or random), shown to the players in your game.</li>
<li><strong>Your location, only during a round you have joined</strong>, while the app is open. Your own team sees you live. Hunters see runners only where they were at each ping the host scheduled, or live if a runner stays outside the play zone. Runners never see hunters. Before a round, the host’s location places the play zone.</li>
<li><strong>Chat messages</strong> you send. Only your own team receives them.</li>
<li><strong>An optional account</strong> through Sign in with Apple or Google: a provider identifier, your name and, if the provider shares it, your email. It keeps your name, round alerts and hosting on every phone you sign in on. You can play without one.</li>
<li><strong>A push notification token</strong>, if you sign in and allow notifications, to send round alerts (round start, pings, the zone shrinking, round over).</li>
<li><strong>Purchases</strong>: if you unlock hosting, Apple or Google process the payment; RevenueCat tells us the purchase is valid. We never see card details.</li>
</ul>
<p>The demo round uses bots on your phone and sends none of this.</p>
<h2>Who processes it</h2>
<ul>
<li>Our server, hosted for qla.dev, stores rooms, players, messages and accounts.</li>
<li>Pusher delivers live game updates between the players of a room.</li>
<li>Expo delivers push notifications.</li>
<li>RevenueCat validates purchases.</li>
<li>Maps come from Apple Maps, Google Maps or OpenStreetMap; loading map tiles sends those services your device’s network address and the map area.</li>
</ul>
<p>We do not sell your data, show ads or use it to profile you.</p>
<h2>Keeping and deleting it</h2>
<p>Game data is kept to run the game and show results. You can delete your account in the app (Settings → Delete account); this removes your account, sign-in and push tokens. To have game data from a room removed, contact us.</p>
<h2>Children</h2>
<p>Hideya is played in real places. Players under 16 should play with a parent’s or guardian’s permission and play somewhere safe.</p>
<h2>Contact</h2>
<p>Questions or requests: <a href="https://qla.dev">qla.dev</a>.</p>`,
  },
  terms: {
    title: "Terms of use",
    body: `
<p>By using Hideya you agree to these terms.</p>
<h2>Play safely</h2>
<p>Hideya is played on real streets. You are responsible for your own safety and for following local laws: watch for traffic, stay out of private property and closed areas, and stop playing whenever it is unsafe. Agree the play zone with everyone before a round.</p>
<h2>Be fair and kind</h2>
<p>Tags are confirmed in person on an honour system. Do not cheat, harass, threaten or share other players’ locations outside the game. We may remove players or accounts that break these rules.</p>
<h2>Hosting</h2>
<p>Joining a game is free. Hosting may require a one-time purchase, processed by Apple or Google under their terms; refunds follow their policies.</p>
<h2>The service</h2>
<p>Hideya is in preview and provided as it is. Location, connectivity and timing depend on your device and network, and the service may change or be unavailable. To the extent the law allows, qla.dev is not liable for loss or injury arising from playing.</p>
<h2>Contact</h2>
<p><a href="https://qla.dev">qla.dev</a></p>`,
  },
  cookies: {
    title: "Cookies",
    body: `
<p>The Hideya website does not use advertising or tracking cookies.</p>
<ul>
<li>It remembers your chosen website language in your browser’s local storage. Clearing your browser data removes it.</li>
<li>The app keeps its settings, your last rounds and, if you sign in, your session on your phone.</li>
</ul>
<p>Map tiles and fonts may be loaded from the services named in the <a href="privacy">privacy policy</a>.</p>`,
  },
};

const page = (key, { title, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} · Hideya</title>
<link rel="icon" href="assets/hideya/icon.png" type="image/png">
<style>
@font-face { font-family: Fredoka; src: url("assets/hideya/Fredoka-Bold.ttf") format("truetype"); font-weight: 700; font-display: swap; }
:root { color-scheme: dark; }
body { margin: 0; background: #160626; color: #f2ecf8; font: 17px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
main { max-width: 720px; margin: 0 auto; padding: 40px 20px 64px; }
a { color: #ff9a5c; }
.brand { display: inline-block; font: 700 28px Fredoka, ui-rounded, sans-serif; color: #fff; text-decoration: none; }
.brand span { color: #ff6a13; }
h1 { font: 700 44px/1.1 Fredoka, ui-rounded, sans-serif; margin: 28px 0 6px; color: #fff; }
h2 { font: 700 22px Fredoka, ui-rounded, sans-serif; margin: 30px 0 8px; color: #fff; }
.updated { color: #bcaecd; font-size: 14px; margin: 0 0 24px; }
li { margin: 6px 0; }
nav { margin-top: 40px; display: flex; gap: 18px; flex-wrap: wrap; font-size: 15px; }
</style>
</head>
<body>
<main>
<a class="brand" href="./"><span>h</span>ideya</a>
<h1>${title}</h1>
<p class="updated">Last updated ${updated}</p>
${body.trim()}
<nav>${Object.entries(pages).filter(([k]) => k !== key).map(([k, p]) => `<a href="${k}">${p.title}</a>`).join("")}<a href="./">Hideya</a></nav>
</main>
</body>
</html>
`;

mkdirSync(out, { recursive: true });
for (const [key, content] of Object.entries(pages)) writeFileSync(resolve(out, `${key}.html`), page(key, content));
console.log(`Legal pages written: ${Object.keys(pages).join(", ")}`);
