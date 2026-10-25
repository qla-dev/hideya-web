import { english } from "../copy";
export function Features() {
  return (
    <section className="band" id="features" data-theme-at="light">
      <div className="band-head">
        <div className="feat-head">
          <span
            className="eyebrow"
            data-pop=""
            data-i18n="index.section.features"
          >{english["index.section.features"]}</span>
          <h2 className="h2 x" data-pop="" data-i18n="index.features.title">{english["index.features.title"]}</h2>
        </div>
        <p
          className="lede"
          data-pop=""
          data-pop-delay="80"
          data-i18n="index.features.lede"
        >{english["index.features.lede"]}</p>
      </div>
      <div className="cards">
        <div className="card card-ink f-ping" data-pop="">
          <div className="panel" aria-hidden="true">
            <div className="map"></div>
            <div
              className="at pg1"
              style={{ left: "30%", top: "60%", opacity: 0.0 }}
            >
              <div className="pg-ghost"></div>
            </div>
            <div className="at pg0" style={{ left: "30%", top: "60%" }}>
              <div className="pg-ring"></div>
              <div className="pg-dot"></div>
              <div className="pg-chip">
                <b>{"LEJLA"}</b>
                <span className="pg-ago" data-i18n="index.features.ping.ago">{english["index.features.ping.ago"]}</span>
              </div>
            </div>
            <div className="corner" data-i18n="index.features.ping.view">{english["index.features.ping.view"]}</div>
          </div>
          <div className="card-text">
            <h3
              className="card-title x"
              style={{ margin: 0.0 }}
              data-i18n="index.features.ping.title"
            >{english["index.features.ping.title"]}</h3>
            <p data-i18n="index.features.ping.text">{english["index.features.ping.text"]}</p>
          </div>
        </div>
        <div
          className="card card-white f-zone"
          data-pop=""
          data-pop-delay="100"
        >
          <div className="panel" aria-hidden="true">
            <div className="map"></div>
            <div className="zone-ring"></div>
            <div className="zone-next"></div>
            <div className="runner-at">
              <div className="live-ring"></div>
              <div className="runner-dot"></div>
              <div className="live-chip" data-i18n="index.features.zone.live">{english["index.features.zone.live"]}</div>
            </div>
            <div className="zone-warn" data-i18n="index.features.zone.warn">{english["index.features.zone.warn"]}</div>
          </div>
          <div className="card-text">
            <h3
              className="card-title x"
              style={{ margin: 0.0 }}
              data-i18n="index.features.zone.title"
            >{english["index.features.zone.title"]}</h3>
            <p data-i18n="index.features.zone.text">{english["index.features.zone.text"]}</p>
          </div>
        </div>
        <div className="card card-red f-radio" data-pop="">
          <div className="chat" aria-hidden="true">
            <span className="sys r0" data-i18n="index.features.radio.ping">{english["index.features.radio.ping"]}</span>
            <div className="bub r1">
              <span>{"Amir"}</span>
              <span data-i18n="index.features.radio.msg1">{english["index.features.radio.msg1"]}</span>
            </div>
            <div className="bub mine r2">
              <span data-i18n="index.features.radio.you">{english["index.features.radio.you"]}</span>
              <span data-i18n="index.features.radio.msg2">{english["index.features.radio.msg2"]}</span>
            </div>
            <div className="bub r3">
              <span>{"Dino"}</span>
              <span data-i18n="index.features.radio.msg3">{english["index.features.radio.msg3"]}</span>
            </div>
          </div>
          <div className="card-text">
            <h3
              className="card-title x"
              style={{ margin: 0.0 }}
              data-i18n="index.features.radio.title"
            >{english["index.features.radio.title"]}</h3>
            <p data-i18n="index.features.radio.text">{english["index.features.radio.text"]}</p>
          </div>
        </div>
        <div className="card card-white f-team" data-pop="" data-pop-delay="80">
          <div
            className="panel"
            style={{ minHeight: "250px" }}
            aria-hidden="true"
          >
            <div className="map"></div>
            <div className="mate tm0" style={{ left: "25%", top: "30%" }}>
              {"AM"}
            </div>
            <div className="mate tm1" style={{ left: "70%", top: "62%" }}>
              {"DI"}
            </div>
            <div className="mate tm2" style={{ left: "40%", top: "75%" }}>
              {"LE"}
            </div>
            <div className="you-big" data-i18n="index.features.team.you">{english["index.features.team.you"]}</div>
          </div>
          <div className="card-text">
            <h3
              className="card-title x"
              style={{ margin: 0.0 }}
              data-i18n="index.features.team.title"
            >{english["index.features.team.title"]}</h3>
            <p data-i18n="index.features.team.text">{english["index.features.team.text"]}</p>
          </div>
        </div>
        <div
          className="card card-ink f-pocket"
          data-pop=""
          data-pop-delay="160"
        >
          <div className="lock" aria-hidden="true">
            <div className="lock-top">
              <span className="lock-time x">{"21:14"}</span>
              <span className="buzz" data-i18n="index.features.pocket.buzz">{english["index.features.pocket.buzz"]}</span>
            </div>
            <div className="notes">
              <div className="note n0">
                <div className="note-icon c">{"H"}</div>
                <div>
                  <span
                    className="note-app"
                    data-i18n="index.features.pocket.now"
                  >{english["index.features.pocket.now"]}</span>
                  <b data-i18n="index.features.pocket.ping">{english["index.features.pocket.ping"]}</b>
                  <span
                    className="note-body"
                    data-i18n="index.features.pocket.pingText"
                  >{english["index.features.pocket.pingText"]}</span>
                </div>
              </div>
              <div className="note n1">
                <div className="note-icon c">{"H"}</div>
                <div>
                  <span
                    className="note-app"
                    data-i18n="index.features.pocket.now"
                  >{english["index.features.pocket.now"]}</span>
                  <b data-i18n="index.features.zone.warn">{english["index.features.zone.warn"]}</b>
                  <span
                    className="note-body"
                    data-i18n="index.features.pocket.zoneText"
                  >{english["index.features.pocket.zoneText"]}</span>
                </div>
              </div>
              <div className="note n2">
                <div className="note-icon c">{"H"}</div>
                <div>
                  <span
                    className="note-app"
                    data-i18n="index.features.pocket.now"
                  >{english["index.features.pocket.now"]}</span>
                  <b data-i18n="index.features.pocket.over">{english["index.features.pocket.over"]}</b>
                  <span
                    className="note-body"
                    data-i18n="index.features.pocket.overText"
                  >{english["index.features.pocket.overText"]}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-text">
            <h3
              className="card-title x"
              style={{ margin: 0.0 }}
              data-i18n="index.features.pocket.title"
            >{english["index.features.pocket.title"]}</h3>
            <p data-i18n="index.features.pocket.text">{english["index.features.pocket.text"]}</p>
          </div>
        </div>
        <div className="card card-white f-rules" data-pop="">
          <div className="card-text">
            <h3
              className="card-title x"
              style={{ margin: 0.0 }}
              data-i18n="index.features.rules.title"
            >{english["index.features.rules.title"]}</h3>
            <p data-i18n="index.features.rules.text">{english["index.features.rules.text"]}</p>
          </div>
          <div className="sliders" aria-hidden="true">
            <div className="slider">
              <div className="slider-top">
                <span data-i18n="index.rules.round">{english["index.rules.round"]}</span>
                <span className="x val" data-i18n="index.value.45min">{english["index.value.45min"]}</span>
              </div>
              <div className="track">
                <div className="track-fill"></div>
                <div className="knob"></div>
              </div>
              <div className="ends">
                <span data-i18n="index.value.10min">{english["index.value.10min"]}</span>
                <span data-i18n="index.value.3h">{english["index.value.3h"]}</span>
              </div>
            </div>
            <div className="slider">
              <div className="slider-top">
                <span data-i18n="index.rules.ping">{english["index.rules.ping"]}</span>
                <span className="x val" data-i18n="index.value.5min">{english["index.value.5min"]}</span>
              </div>
              <div className="track">
                <div className="track-fill"></div>
                <div className="knob"></div>
              </div>
              <div className="ends">
                <span data-i18n="index.value.1min">{english["index.value.1min"]}</span>
                <span data-i18n="index.value.30min">{english["index.value.30min"]}</span>
              </div>
            </div>
            <div className="slider">
              <div className="slider-top">
                <span data-i18n="index.rules.headStart">{english["index.rules.headStart"]}</span>
                <span className="x val" data-i18n="index.value.3min">{english["index.value.3min"]}</span>
              </div>
              <div className="track">
                <div className="track-fill"></div>
                <div className="knob"></div>
              </div>
              <div className="ends">
                <span data-i18n="index.value.none">{english["index.value.none"]}</span>
                <span data-i18n="index.value.15min">{english["index.value.15min"]}</span>
              </div>
            </div>
            <div className="slider">
              <div className="slider-top">
                <span data-i18n="index.rules.zone">{english["index.rules.zone"]}</span>
                <span className="x val" data-i18n="index.value.840mAcross">{english["index.value.840mAcross"]}</span>
              </div>
              <div className="track">
                <div className="track-fill"></div>
                <div className="knob"></div>
              </div>
              <div className="ends">
                <span data-i18n="index.value.400m">{english["index.value.400m"]}</span>
                <span data-i18n="index.value.3km">{english["index.value.3km"]}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card card-red f-players"
          data-pop=""
          data-pop-delay="100"
        >
          <span className="three c" aria-hidden="true">
            {"3+"}
          </span>
          <div className="card-text">
            <h3
              className="card-title x"
              style={{ margin: 0.0 }}
              data-i18n="index.features.players.title"
            >{english["index.features.players.title"]}</h3>
            <p data-i18n="index.features.players.text">{english["index.features.players.text"]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
