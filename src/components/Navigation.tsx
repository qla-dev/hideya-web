import { english } from "../copy";
import { HideyaWordmark } from "./HideyaWordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navigation() {
  return (
    <nav
      className="nav"
      data-theme="red"
      aria-label="Main"
      data-i18n-attr="aria-label:index.nav.label"
    >
      <a
        className="nav-logo"
        href="#top"
        aria-label="Hideya, back to top"
        data-i18n-attr="aria-label:index.nav.top"
      >
        <span className="nav-wordmark logo"><HideyaWordmark /></span>
      </a>
      <div className="nav-right">
        <div className="nav-links">
          <a href="#how" data-i18n="index.section.how">{english["index.section.how"]}</a>
          <a href="#features" data-i18n="index.section.features">{english["index.section.features"]}</a>
          <a href="#privacy" data-i18n="index.section.privacy">{english["index.section.privacy"]}</a>
        </div>
        <LanguageSwitcher />
        <a className="nav-cta" href="#get" data-i18n="index.nav.get">{english["index.nav.get"]}</a>
      </div>
    </nav>
  );
}
