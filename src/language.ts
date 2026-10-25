import { isLocale, translate, type Locale } from "./copy";

export function initializeLanguages() {
  const controller = new AbortController();
  function apply(locale: Locale, updateUrl = false) {
    document.documentElement.lang = locale;
    document.documentElement.dataset.language = locale;
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((node) => {
      node.textContent = translate(node.dataset.i18n!);
    });
    document.querySelectorAll<HTMLElement>("[data-i18n-attr]").forEach((node) => {
      for (const entry of node.dataset.i18nAttr!.split(";")) {
        const separator = entry.indexOf(":");
        node.setAttribute(entry.slice(0, separator), translate(entry.slice(separator + 1)));
      }
    });
    document.querySelectorAll<HTMLSelectElement>("[data-language-select]").forEach((select) => { select.value = locale; });
    document.querySelectorAll<HTMLAnchorElement>('a[href*="?page="]').forEach((link) => {
      const target = new URL(link.href);
      target.searchParams.set("lang", locale);
      link.href = target.href;
    });
    document.title = translate("meta.title");
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      document.querySelector(selector)?.setAttribute("content", translate("meta.description"));
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", translate("meta.title"));
    try { localStorage.setItem("hideya.language", locale); } catch { /* Private browsing can disable storage. */ }
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set("lang", locale);
      history.replaceState(null, "", url);
    }
    window.dispatchEvent(new CustomEvent("hideya:languagechange"));
  }
  document.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement && event.target.matches("[data-language-select]") && isLocale(event.target.value)) {
      apply(event.target.value, true);
    }
  }, { signal: controller.signal });
  const requested = new URLSearchParams(location.search).get("lang");
  let saved: string | null = null;
  try { saved = localStorage.getItem("hideya.language"); } catch { /* Use the URL or default. */ }
  apply(isLocale(requested) ? requested : isLocale(saved) ? saved : "en");
  return () => controller.abort();
}
