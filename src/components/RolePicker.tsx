import { english } from "../copy";
export function RolePicker() {
  return (
    <section className="band" id="sides" data-theme-at="light">
      <div className="band-head">
        <h2 className="h2 x" data-pop="" data-i18n="index.sides.title">{english["index.sides.title"]}</h2>
        <p
          className="lede"
          data-pop=""
          data-pop-delay="80"
          data-i18n="index.sides.lede"
        >{english["index.sides.lede"]}</p>
      </div>
      <div className="sides">
        <div className="side-wrap" data-pop="">
          <div className="side side-h">
            <div className="side-top x">
              <span data-i18n="index.hunters">{english["index.hunters"]}</span>
              <span className="you" data-i18n="index.sides.you">{english["index.sides.you"]}</span>
            </div>
            <span className="big x" data-i18n="index.youreIt">{english["index.youreIt"]}</span>
            <div className="side-body">
              <p data-i18n="index.sides.hunters.text">{english["index.sides.hunters.text"]}</p>
              <span className="x" data-i18n="index.sides.hunters.win">{english["index.sides.hunters.win"]}</span>
            </div>
          </div>
        </div>
        <div className="side-wrap" data-pop="" data-pop-delay="120">
          <div className="side side-r">
            <div className="side-top x">
              <span data-i18n="index.runners">{english["index.runners"]}</span>
              <span className="you" data-i18n="index.sides.you">{english["index.sides.you"]}</span>
            </div>
            <span className="big x" data-i18n="index.run">{english["index.run"]}</span>
            <div className="side-body">
              <p data-i18n="index.sides.runners.text">{english["index.sides.runners.text"]}</p>
              <span className="x" data-i18n="index.sides.runners.win">{english["index.sides.runners.win"]}</span>
            </div>
          </div>
        </div>
        <button className="rand" type="button">
          <span className="x" data-i18n="index.random">{english["index.random"]}</span>
          <span data-i18n="index.sides.tap">{english["index.sides.tap"]}</span>
        </button>
        <p className="sr" role="status"></p>
      </div>
    </section>
  );
}
