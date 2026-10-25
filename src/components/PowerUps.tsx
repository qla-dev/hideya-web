import type { ReactNode } from "react";
import { english, type CopyKey } from "../copy";

/** The app's power-up marks (frontend/src/components/power-up-icon.tsx), drawn in currentColor. */
const ICONS: Record<string, ReactNode> = {
  ghost: (
    <path fillRule="evenodd" d="M12 2.4c-4.3 0-7.4 3.3-7.4 7.6v10.5c0 .7.8 1 1.3.6l1.5-1.3 1.6 1.4c.4.4 1.1.4 1.5 0L12 19.8l1.5 1.4c.4.4 1.1.4 1.5 0l1.6-1.4 1.5 1.3c.5.4 1.3.1 1.3-.6V10c0-4.3-3.1-7.6-7.4-7.6ZM8.1 10.6a1.6 1.8 0 1 0 3.2 0 1.6 1.8 0 1 0-3.2 0Zm4.6 0a1.6 1.8 0 1 0 3.2 0 1.6 1.8 0 1 0-3.2 0Z" />
  ),
  decoy: (
    <>
      <path d="M16.6 3.6c-2.4 0-4.2 1.9-4.2 4.2 0 3 4.2 7.4 4.2 7.4s4.2-4.4 4.2-7.4c0-2.3-1.8-4.2-4.2-4.2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2.2 2" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" d="M8.2 7.6c-2.9 0-5.1 2.3-5.1 5.1 0 3.7 5.1 8.9 5.1 8.9s5.1-5.2 5.1-8.9c0-2.8-2.2-5.1-5.1-5.1Zm-1.8 5.1a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 1 0-3.6 0Z" />
    </>
  ),
  shrink: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.6" strokeWidth="1.8" strokeDasharray="2.6 2.4" />
      <circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none" />
      <path strokeWidth="2.2" d="M12 4.6v3.2m-1.7-1.6L12 7.9l1.7-1.7M12 19.4v-3.2m-1.7 1.6 1.7-1.7 1.7 1.7M4.6 12h3.2M6.2 10.3 7.9 12l-1.7 1.7M19.4 12h-3.2m1.6-1.7L16.1 12l1.7 1.7" />
    </g>
  ),
  flare: (
    <>
      <path d="M12 6.8 13.5 10.5 17.2 12 13.5 13.5 12 17.2 10.5 13.5 6.8 12 10.5 10.5Z" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4" />
        <path d="M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6" opacity="0.6" />
      </g>
    </>
  ),
  pickup: <path d="M13.2 2.6 5.4 13.1c-.4.5 0 1.2.6 1.2h4.6l-1.1 7c-.1.7.8 1.1 1.2.5l7.8-10.5c.4-.5 0-1.2-.6-1.2h-4.6l1.1-7c.1-.7-.8-1.1-1.2-.5Z" />,
  daily: <path fillRule="evenodd" d="M20 7h-2.2c.4-.6.6-1.2.6-1.9C18.4 3.4 17 2 15.3 2c-1.4 0-2.5.9-3.3 2.2C11.2 2.9 10.1 2 8.7 2 7 2 5.6 3.4 5.6 5.1c0 .7.2 1.3.6 1.9H4c-1.1 0-2 .9-2 2v2c0 .7.4 1.3 1 1.7V20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7.3c.6-.4 1-1 1-1.7V9c0-1.1-.9-2-2-2Zm-4.7-3c.6 0 1.1.5 1.1 1.1S15.9 7 15.3 7H13c.4-1.6 1.2-3 2.3-3ZM8.7 4c1.1 0 1.9 1.4 2.3 3H8.7c-.6 0-1.1-.4-1.1-1S8.1 4 8.7 4ZM11 20H5v-7h6v7Zm0-9H4V9h7v2Zm8 9h-6v-7h6v7Zm1-9h-7V9h7v2Z" />,
};

function Mark({ name }: { name: string }) {
  return (
    <span className="pu-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">{ICONS[name]}</svg>
    </span>
  );
}

const CARDS = [
  { kind: "ghost", team: "index.powerups.runners" },
  { kind: "decoy", team: "index.powerups.runners" },
  { kind: "shrink", team: "index.powerups.hunters" },
  { kind: "flare", team: "index.powerups.hunters" },
] as const;

const t = (key: string) => english[key as CopyKey];

/** Power-ups: the four abilities, map pickups and the daily one for registered players. */
export function PowerUps() {
  return (
    <section id="power-ups" data-theme-at="light">
      <div className="powerups">
        <div className="powerups-head">
          <span className="eyebrow" data-pop="" data-i18n="index.section.powerups">{t("index.section.powerups")}</span>
          <h2 className="x" data-pop="" data-i18n="index.powerups.title">{t("index.powerups.title")}</h2>
          <p className="lede" data-pop="" data-i18n="index.powerups.lede">{t("index.powerups.lede")}</p>
        </div>
        <ul className="pu-grid">
          {CARDS.map(({ kind, team }) => (
            <li key={kind} className="pu-card" data-hl="">
              <div className="pu-top">
                <Mark name={kind} />
                <span className="pu-team" data-i18n={team}>{t(team)}</span>
              </div>
              <span className="x" data-i18n={`index.powerups.${kind}.title`}>{t(`index.powerups.${kind}.title`)}</span>
              <p data-i18n={`index.powerups.${kind}.text`}>{t(`index.powerups.${kind}.text`)}</p>
            </li>
          ))}
        </ul>
        <div className="pu-extras">
          {(["pickup", "daily"] as const).map((name) => (
            <div key={name} className={`pu-extra pu-${name}`} data-hl="">
              <Mark name={name} />
              <div>
                <span className="x" data-i18n={`index.powerups.${name}.title`}>{t(`index.powerups.${name}.title`)}</span>
                <p data-i18n={`index.powerups.${name}.text`}>{t(`index.powerups.${name}.text`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
