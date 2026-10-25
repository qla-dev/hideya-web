import type { Locale } from "./copy";

/** Small inline SVG flags for the language switcher. */
export const flags: Record<Locale, string> = {
  en: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3CclipPath id='c'%3E%3Cpath d='M0 0v30h60V0z'/%3E%3C/clipPath%3E%3CclipPath id='t'%3E%3Cpath d='M30 15h30v15zv15H0zH0V0zV0h30z'/%3E%3C/clipPath%3E%3Cg clip-path='url(%23c)'%3E%3Cpath d='M0 0v30h60V0z' fill='%23012169'/%3E%3Cpath d='M0 0l60 30m0-30L0 30' stroke='%23fff' stroke-width='6'/%3E%3Cpath d='M0 0l60 30m0-30L0 30' clip-path='url(%23t)' stroke='%23C8102E' stroke-width='4'/%3E%3Cpath d='M30 0v30M0 15h60' stroke='%23fff' stroke-width='10'/%3E%3Cpath d='M30 0v30M0 15h60' stroke='%23C8102E' stroke-width='6'/%3E%3C/g%3E%3C/svg%3E",
  bs: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Cpath d='M0 0h60v30H0z' fill='%23002395'/%3E%3Cpath d='M17 0h30v30z' fill='%23FECB00'/%3E%3Cg fill='%23fff'%3E%3Ccircle cx='13' cy='2' r='1.6'/%3E%3Ccircle cx='17' cy='6.3' r='1.6'/%3E%3Ccircle cx='21' cy='10.6' r='1.6'/%3E%3Ccircle cx='25' cy='14.9' r='1.6'/%3E%3Ccircle cx='29' cy='19.2' r='1.6'/%3E%3Ccircle cx='33' cy='23.5' r='1.6'/%3E%3Ccircle cx='37' cy='27.8' r='1.6'/%3E%3C/g%3E%3C/svg%3E",
  de: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 3'%3E%3Cpath d='M0 0h5v3H0z'/%3E%3Cpath d='M0 1h5v2H0z' fill='%23D00'/%3E%3Cpath d='M0 2h5v1H0z' fill='%23FFCE00'/%3E%3C/svg%3E",
};
