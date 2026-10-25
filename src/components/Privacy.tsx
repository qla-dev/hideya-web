import { english } from "../copy";
export function Privacy() {
  return (
    <section id="privacy" data-theme-at="light">
      <div className="privacy">
        <div className="privacy-l">
          <span
            className="eyebrow"
            data-pop=""
            data-i18n="index.section.privacy"
          >{english["index.section.privacy"]}</span>
          <h2 className="x" data-pop="" data-i18n="index.privacy.title">{english["index.privacy.title"]}</h2>
          <p className="lede" data-pop="" data-i18n="index.privacy.lede">{english["index.privacy.lede"]}</p>
        </div>
        <ol className="rows">
          <li data-hl="">
            <span className="c" aria-hidden="true">
              {"1"}
            </span>
            <div>
              <span className="x" data-i18n="index.privacy.1.title">{english["index.privacy.1.title"]}</span>
              <p data-i18n="index.privacy.1.text">{english["index.privacy.1.text"]}</p>
            </div>
          </li>
          <li data-hl="">
            <span className="c" aria-hidden="true">
              {"2"}
            </span>
            <div>
              <span className="x" data-i18n="index.privacy.2.title">{english["index.privacy.2.title"]}</span>
              <p data-i18n="index.privacy.2.text">{english["index.privacy.2.text"]}</p>
            </div>
          </li>
          <li data-hl="">
            <span className="c" aria-hidden="true">
              {"3"}
            </span>
            <div>
              <span className="x" data-i18n="index.privacy.3.title">{english["index.privacy.3.title"]}</span>
              <p data-i18n="index.privacy.3.text">{english["index.privacy.3.text"]}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
