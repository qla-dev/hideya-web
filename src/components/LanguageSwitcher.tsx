import { useEffect, useId, useRef, useState } from "react";
import { english, isLocale, locales, localeNames, type Locale } from "../copy";
import { flags } from "../flags";

const current = (): Locale => {
  const lang = document.documentElement.dataset.language;
  return lang && isLocale(lang) ? lang : "en";
};

/**
 * A flag button with a custom dropdown of flags and language names. It drives
 * the hidden native select, which language.ts listens to, so translation keeps
 * one code path.
 */
export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const [focused, setFocused] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const select = useRef<HTMLSelectElement>(null);
  const listId = useId();

  useEffect(() => {
    const sync = () => setLocale(current());
    sync();
    window.addEventListener("hideya:languagechange", sync);
    return () => window.removeEventListener("hideya:languagechange", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const choose = (next: Locale) => {
    setOpen(false);
    if (!select.current || next === locale) return;
    select.current.value = next;
    select.current.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") return setOpen(false);
    if (!open && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      setFocused(Math.max(0, locales.indexOf(locale)));
      return setOpen(true);
    }
    if (!open) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setFocused((i) => (i + 1) % locales.length); }
    if (event.key === "ArrowUp") { event.preventDefault(); setFocused((i) => (i - 1 + locales.length) % locales.length); }
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(locales[focused]); }
  };

  return (
    <div className="language-switcher" ref={root} onKeyDown={onKeyDown}>
      <select ref={select} className="sr" tabIndex={-1} aria-hidden="true" data-language-select="" defaultValue="en">
        {locales.map((l) => <option key={l} value={l}>{localeNames[l]}</option>)}
      </select>
      <button type="button" className="language-button" aria-haspopup="listbox" aria-expanded={open} aria-controls={listId}
        aria-label={`${english["common.language"]}: ${localeNames[locale]}`} data-i18n-attr="title:common.language" onClick={() => setOpen((o) => !o)}>
        <img src={flags[locale]} alt="" width={30} height={15} />
        <svg className="language-caret" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5 11 1.5" /></svg>
      </button>
      {open && (
        <ul id={listId} className="language-menu" role="listbox" aria-label={english["common.language"]}>
          {locales.map((l, i) => (
            <li key={l} role="option" aria-selected={l === locale} className={`language-option${i === focused ? " is-focused" : ""}`}
              onMouseEnter={() => setFocused(i)} onClick={() => choose(l)}>
              <img src={flags[l]} alt="" width={24} height={12} />
              <span lang={l}>{localeNames[l]}</span>
              {l === locale && <svg className="language-check" viewBox="0 0 16 12" aria-hidden="true"><path d="M1.5 6.5 6 10.5 14.5 1.5" /></svg>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
