import { english } from "../copy";
import { useEffect } from "react";
import { initializeLanguages } from "../language";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function PreviewDocuments({ page }: { page: string }) {
  useEffect(() => initializeLanguages(), []);
  return (
    <main className="document-page">
      <div className="document-tools">
        <a href="./" data-i18n="docs.back">{english["docs.back"]}</a>
        <LanguageSwitcher />
      </div>
      {page === "terms" ? <h1 data-i18n="docs.terms.title">{english["docs.terms.title"]}</h1> : <h1 data-i18n="docs.support.title">{english["docs.support.title"]}</h1>}
      <p data-i18n="docs.intro">{english["docs.intro"]}</p>
      {page === "terms" ? <>
        <h2 data-i18n="docs.safety.title">{english["docs.safety.title"]}</h2>
        <p data-i18n="docs.safety.text">{english["docs.safety.text"]}</p>
        <h2 data-i18n="docs.preview.title">{english["docs.preview.title"]}</h2>
        <p data-i18n="docs.preview.text">{english["docs.preview.text"]}</p>
      </> : <>
        <h2 data-i18n="docs.start.title">{english["docs.start.title"]}</h2>
        <p data-i18n="docs.start.text">{english["docs.start.text"]}</p>
        <a className="btn btn-ink" href="./#get" data-i18n="docs.downloads">{english["docs.downloads"]}</a>
        <h2 data-i18n="docs.location.title">{english["docs.location.title"]}</h2>
        <p data-i18n="docs.location.text">{english["docs.location.text"]}</p>
        <h2 data-i18n="docs.data.title">{english["docs.data.title"]}</h2>
        <p data-i18n="docs.data.text">{english["docs.data.text"]}</p>
      </>}
    </main>
  );
}
