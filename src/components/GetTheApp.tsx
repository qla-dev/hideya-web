import { english } from "../copy";
import { HideyaWordmark } from "./HideyaWordmark";
import { StoreButtons } from "./StoreButtons";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function GetTheApp() {
  return (
    <section id="get" className="on-red" data-theme-at="red">
      <div className="close-top">
        <div className="close-l">
          <span className="eyebrow" data-pop="" data-i18n="index.close.eyebrow">{english["index.close.eyebrow"]}</span>
          <h2 className="h2 x" data-pop="" data-i18n="index.close.title">{english["index.close.title"]}</h2>
          <span className="close-sub x" data-pop="" data-pop-delay="120" data-i18n="index.close.sub">{english["index.close.sub"]}</span>
        </div>
        <div className="close-r" data-pop="" data-pop-delay="160">
          <StoreButtons />
          <span data-i18n="index.close.small">{english["index.close.small"]}</span>
        </div>
      </div>
      <div className="close-logo logo" aria-label="Hideya"><HideyaWordmark /></div>
      <footer className="foot">
        <span>© 2026 Hideya</span>
        <span data-i18n="index.hero.title">{english["index.hero.title"]}</span>
        <span className="foot-links">
          <a className="foot-link" href="#privacy" data-i18n="common.footer.privacy">{english["common.footer.privacy"]}</a>
          <a className="foot-link" href="?page=terms" data-i18n="common.footer.terms">{english["common.footer.terms"]}</a>
          <a className="foot-link" href="?page=support" data-i18n="common.footer.support">{english["common.footer.support"]}</a>
          <a className="foot-link" href="#community" data-i18n="common.footer.discord">{english["common.footer.discord"]}</a>
          <a className="foot-link ig" href="#community">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
            </svg>
            <span className="sr" data-i18n="common.footer.instagram">{english["common.footer.instagram"]}</span>@hideya
          </a>
        </span>
        <LanguageSwitcher />
      </footer>
    </section>
  );
}
