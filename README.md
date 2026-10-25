# Hideya website

This is the **full original website reconstructed in React**, after REA browser capture and static JavaScript analysis. It is not the reduced landing-page redesign.

The original order, layout, and interactions are retained: launch splash; hero that shrinks into the four-screen phone walkthrough; hunters' countdown; Random role picker; all seven feature panels; four rules sliders; three privacy rows; waitlist; closing wordmark; footer language picker; and the scroll-progress runner.

## Edit and run

```powershell
cd web
pnpm install
pnpm dev
```

The editable React preview is `http://127.0.0.1:5173`. Each original section is a named component in `src/components/`. `src/styles/original-layout.css` preserves the reference geometry and responsive rules; `src/styles/hideya-brand.css` applies Hideya's palette, logo, and Fredoka Bold. `src/motion/original-motion.js` preserves the original animation engine with cleanup when React unmounts it.

`index.html` is the Vite/React entry. An IDE's static server automatically opens `dist/index.html`; it cannot compile TSX itself. Edit the components and use `pnpm dev` for live changes.

## Build

`pnpm typecheck` checks the website. `pnpm build:landing` builds only the React landing page. `pnpm build` builds both the site at `/` and the Expo browser app at `/play/` into `dist/` for `https://hideya.qla.dev`.

From the workspace root, preview the exact deployment artifact with:

```powershell
python tools/serve_preview.py --site --port 8082
```

Upload the **contents of `web/dist/`** to the domain document root. The included `.htaccess` supports extensionless `/play` routes on Apache. DNS and live hosting have not been changed.

## Brand and provenance

The name is Hideya, with red `#FF303B`, deep purple `#160626`, white, and Fredoka Bold. The native icon is an unchanged square crop of the supplied symbol. The separate `assets/hideya/symbol-web.png` matches only the web background to `#160626`, keeping the original alpha; this removes the visible background rectangle without editing the phone icon or original image.

`reconstruction-report.json` records the source section inventory. REA evidence `ev_4eee9f35d80a242e635bdab65b6ae40edf697b92d6391d0b37a4741f6e780b9c` records analysis of the archived scripts. The original HTML/CSS/JS remain intact in `reference/scram/`; store screenshots, Android artifacts, and REA evidence are research material excluded from publication. Ten original locale catalogs plus English preserve the eleven-choice language picker.

All original visual sections remain, with release labels reflecting the actual local preview. Native store releases, multiplayer, and the mailing-list backend are not live. The retained waitlist form explicitly reports that no email was sent or stored. Third-party analytics and the original app's backend are not connected.
