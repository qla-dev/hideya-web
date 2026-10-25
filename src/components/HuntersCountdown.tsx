import { english } from "../copy";
export function HuntersCountdown() {
  return (
    <section
      className="pin-b"
      data-theme-at="pinB"
      aria-labelledby="count-title"
    >
      <div className="stick stick-b">
        <div className="cd-head">
          <span className="eyebrow" data-i18n="index.count.eyebrow">{english["index.count.eyebrow"]}</span>
          <h2
            className="cd-title x"
            id="count-title"
            data-i18n="index.count.title"
          >{english["index.count.title"]}</h2>
        </div>
        <div className="cd-ticks" aria-hidden="true">
          <i className="on"></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div className="count c" aria-hidden="true">
          {"1"}
        </div>
        <div className="ready" aria-hidden="true">
          <div className="ready-text c">
            <span data-i18n="index.count.ready1">{english["index.count.ready1"]}</span>
            <span data-i18n="index.count.ready2">{english["index.count.ready2"]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
