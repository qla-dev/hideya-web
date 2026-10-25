import { english, locales, localeNames } from "../copy";

export function LanguageSwitcher() {
  return (
    <label className="language-switcher">
      <span className="sr" data-i18n="common.language">{english["common.language"]}</span>
      <select data-language-select="" defaultValue="en" aria-label={english["common.language"]} data-i18n-attr="aria-label:common.language">
        {locales.map((locale) => <option key={locale} value={locale} lang={locale}>{localeNames[locale]}</option>)}
      </select>
    </label>
  );
}
