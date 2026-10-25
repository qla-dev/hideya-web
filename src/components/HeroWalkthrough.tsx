import { english } from "../copy";
import { HideyaWordmark } from "./HideyaWordmark";
import { StoreButtons } from "./StoreButtons";

export function HeroWalkthrough() {
  return (
    <section className="pin-a" data-theme-at="pinA">
      <div className="anchor" id="top"></div>
      <div className="anchor" id="how"></div>
      <div className="stick stick-a">
        <div className="steps-ui">
          <div className="steps-left">
            <div className="steps-head">
              <h2
                className="eyebrow"
                id="how-title"
                style={{ margin: 0.0 }}
                data-i18n="index.section.how"
              >{english["index.section.how"]}</h2>
              <div className="ticks" aria-hidden="true">
                <i className="tick on"></i>
                <i className="tick"></i>
                <i className="tick"></i>
                <i className="tick"></i>
              </div>
            </div>
            <div className="nums" aria-hidden="true">
              <div className="num c on">{"01"}</div>
              <div className="num c">{"02"}</div>
              <div className="num c ink">{"03"}</div>
              <div className="num c">{"04"}</div>
            </div>
          </div>
          <div className="steps-right">
            <ol
              className="txts"
              style={{ margin: 0.0, padding: 0.0, listStyle: "none" }}
            >
              <li className="txt on">
                <span className="eyebrow" data-i18n="index.how.host.eyebrow">{english["index.how.host.eyebrow"]}</span>
                <h3 className="x" data-i18n="index.how.host.title">{english["index.how.host.title"]}</h3>
                <p data-i18n="index.how.host.text">{english["index.how.host.text"]}</p>
              </li>
              <li className="txt">
                <span className="eyebrow" data-i18n="index.how.join.eyebrow">{english["index.how.join.eyebrow"]}</span>
                <h3 className="x" data-i18n="index.how.join.title">{english["index.how.join.title"]}</h3>
                <p data-i18n="index.how.join.text">{english["index.how.join.text"]}</p>
              </li>
              <li className="txt">
                <span className="eyebrow" data-i18n="index.how.scatter.eyebrow">{english["index.how.scatter.eyebrow"]}</span>
                <h3 className="x" data-i18n="index.run">{english["index.run"]}</h3>
                <p data-i18n="index.how.scatter.text">{english["index.how.scatter.text"]}</p>
              </li>
              <li className="txt">
                <span className="eyebrow" data-i18n="index.how.hunt.eyebrow">{english["index.how.hunt.eyebrow"]}</span>
                <h3 className="x" data-i18n="index.youreIt">{english["index.youreIt"]}</h3>
                <p data-i18n="index.how.hunt.text">{english["index.how.hunt.text"]}</p>
              </li>
            </ol>
          </div>
        </div>
        <div className="phone" aria-hidden="true">
          <div className="screen">
            <div className="scr on">
              <div className="map host-map"></div>
              <div className="host-ring"></div>
              <div className="host-pin"></div>
              <div className="pill-row">
                <div
                  className="pill x"
                  style={{
                    background: "#fff",
                    fontSize: "16px",
                    letterSpacing: "-.02em",
                    boxShadow: "0 4px 14px rgba(32,30,29,.08)",
                  }}
                  data-i18n="index.phone.playZone"
                >{english["index.phone.playZone"]}</div>
                <div
                  className="pill"
                  style={{
                    padding: "0 14px",
                    background: "var(--ink)",
                    color: "#fff",
                    fontWeight: 600.0,
                    fontSize: "14px",
                  }}
                  data-i18n="index.phone.dragMap"
                >{english["index.phone.dragMap"]}</div>
              </div>
              <div className="sheet">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px 12px",
                  }}
                >
                  <div className="kv">
                    <span className="lbl" data-i18n="index.rules.zone">{english["index.rules.zone"]}</span>
                    <span className="x">
                      <span className="zone-val" data-i18n="index.value.300m">{english["index.value.300m"]}</span>
                    </span>
                  </div>
                  <div className="kv">
                    <span className="lbl" data-i18n="index.rules.round">{english["index.rules.round"]}</span>
                    <span className="x" data-i18n="index.value.45min">{english["index.value.45min"]}</span>
                  </div>
                  <div className="kv">
                    <span className="lbl" data-i18n="index.rules.ping">{english["index.rules.ping"]}</span>
                    <span className="x" data-i18n="index.value.5min">{english["index.value.5min"]}</span>
                  </div>
                  <div className="kv">
                    <span className="lbl" data-i18n="index.rules.headStart">{english["index.rules.headStart"]}</span>
                    <span className="x" data-i18n="index.value.3min">{english["index.value.3min"]}</span>
                  </div>
                </div>
                <div style={{ height: "2px", background: "var(--fill)" }}></div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div className="kv">
                    <span className="lbl" data-i18n="index.phone.gameCode">{english["index.phone.gameCode"]}</span>
                    <span
                      className="x"
                      style={{ fontSize: "32px", letterSpacing: ".06em" }}
                    >
                      {"K7Q2FX"}
                    </span>
                  </div>
                  <div
                    className="x"
                    style={{
                      height: "52px",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 22px",
                      borderRadius: "18px",
                      background: "var(--red)",
                      color: "#fff",
                      fontSize: "17px",
                      letterSpacing: "-.02em",
                    }}
                    data-i18n="index.phone.share"
                  >{english["index.phone.share"]}</div>
                </div>
              </div>
            </div>
            <div className="scr scr-join">
              <span
                className="x"
                style={{
                  fontSize: "34px",
                  letterSpacing: "-.04em",
                  lineHeight: 1.0,
                }}
                data-i18n="index.phone.enterCode"
              >{english["index.phone.enterCode"]}</span>
              <div className="code x">
                <div>
                  <span>{"K"}</span>
                </div>
                <div>
                  <span>{"7"}</span>
                </div>
                <div>
                  <span>{"Q"}</span>
                </div>
                <div>
                  <span>{"2"}</span>
                </div>
                <div>
                  <span>{"F"}</span>
                </div>
                <div>
                  <span>{"X"}</span>
                </div>
              </div>
              <span
                className="lbl"
                style={{ marginTop: "8px" }}
                data-i18n="index.phone.playAs"
              >{english["index.phone.playAs"]}</span>
              <div className="opts">
                <div className="opt opt-h">
                  <div>
                    <span className="x" data-i18n="index.hunter">{english["index.hunter"]}</span>
                    <span data-i18n="index.youreIt">{english["index.youreIt"]}</span>
                  </div>
                  <i></i>
                </div>
                <div className="opt opt-r">
                  <div>
                    <span className="x" data-i18n="index.runner">{english["index.runner"]}</span>
                    <span data-i18n="index.run">{english["index.run"]}</span>
                  </div>
                  <i></i>
                </div>
                <div className="opt opt-x">
                  <div>
                    <span className="x" data-i18n="index.random">{english["index.random"]}</span>
                    <span data-i18n="index.phone.letAppDecide">{english["index.phone.letAppDecide"]}</span>
                  </div>
                  <i></i>
                </div>
              </div>
              <div className="fair">
                <div className="fair-bar">
                  <div style={{ flex: 2.0, background: "var(--red)" }}></div>
                  <div style={{ flex: 4.0, background: "var(--ink)" }}></div>
                </div>
                <span data-i18n="index.phone.fair">{english["index.phone.fair"]}</span>
              </div>
              <div className="cta-dark x" data-i18n="index.phone.ready">{english["index.phone.ready"]}</div>
            </div>
            <div className="scr scr-run">
              <span className="lbl" data-i18n="index.phone.role">{english["index.phone.role"]}</span>
              <span className="run-big x" data-i18n="index.run">{english["index.run"]}</span>
              <span className="run-sub" data-i18n="index.phone.runSub">{english["index.phone.runSub"]}</span>
              <div className="head">
                <span className="lbl" data-i18n="index.rules.headStart">{english["index.rules.headStart"]}</span>
                <span className="head-timer x">{"03:00"}</span>
                <div className="head-track">
                  <div className="head-bar"></div>
                </div>
              </div>
            </div>
            <div className="scr">
              <div className="map"></div>
              <div className="hunt-ring"></div>
              <div className="at" style={{ left: "150px", top: "330px" }}>
                <div className="ping-ring"></div>
                <div className="ping-dot"></div>
                <div className="tag">
                  <b>{"LEJLA"}</b>
                  <span className="ping-ago" data-i18n="index.phone.ago">{english["index.phone.ago"]}</span>
                </div>
              </div>
              <div className="at" style={{ left: "262px", top: "410px" }}>
                <div className="ping-ring"></div>
                <div className="ping-dot"></div>
              </div>
              <div className="at" style={{ left: "190px", top: "478px" }}>
                <div className="ping-ring"></div>
                <div className="ping-dot"></div>
              </div>
              <div className="mate hm0" style={{ left: "110px", top: "560px" }}>
                {"AM"}
              </div>
              <div className="mate hm1" style={{ left: "300px", top: "250px" }}>
                {"DI"}
              </div>
              <div className="hunt-head">
                <span className="x" data-i18n="index.youreIt">{english["index.youreIt"]}</span>
                <div>
                  <span className="lbl" data-i18n="index.phone.nextPing">{english["index.phone.nextPing"]}</span>
                  <span className="timer x">{"04:32"}</span>
                </div>
              </div>
              <div className="sheet hunt-sheet">
                <div className="kv">
                  <span className="lbl" data-i18n="index.phone.runnersLeft">{english["index.phone.runnersLeft"]}</span>
                  <span className="x" data-i18n="index.phone.runnersLeftValue">{english["index.phone.runnersLeftValue"]}</span>
                </div>
                <div className="tag-note">
                  <b data-i18n="index.phone.tagInPerson">{english["index.phone.tagInPerson"]}</b>
                  <span data-i18n="index.phone.theyConfirm">{english["index.phone.theyConfirm"]}</span>
                </div>
              </div>
            </div>
            <div className="sb">
              <span className="sb-time">{"9:41"}</span>
              <span className="sb-icons">
                <svg width="19" height="12" viewBox="0 0 19 12">
                  <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7"></rect>
                  <rect x="4.8" y="5" width="3.2" height="7" rx="0.7"></rect>
                  <rect
                    x="9.6"
                    y="2.5"
                    width="3.2"
                    height="9.5"
                    rx="0.7"
                  ></rect>
                  <rect x="14.4" y="0" width="3.2" height="12" rx="0.7"></rect>
                </svg>
                <svg width="17" height="12" viewBox="0 0 17 12">
                  <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z"></path>
                  <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z"></path>
                  <circle cx="8.5" cy="10.5" r="1.5"></circle>
                </svg>
                <svg width="27" height="13" viewBox="0 0 27 13">
                  <rect
                    x="0.5"
                    y="0.5"
                    width="23"
                    height="12"
                    rx="3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity=".35"
                  ></rect>
                  <rect x="2" y="2" width="20" height="9" rx="2"></rect>
                  <path
                    d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z"
                    fillOpacity=".4"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <img
            className="phone-frame"
            src="./assets/phone-frame.webp"
            alt=""
            width="450"
            height="920"
          />
        </div>
        <div className="red on-red">
          <div className="hero">
            <h1 className="hero-logo logo">
              <HideyaWordmark trails />
            </h1>
            <div className="hero-live-map" aria-hidden="true">
              <div className="hero-map-art" />
              <span className="hero-map-zone" />
              <span className="hero-map-ping hero-map-ping-a" />
              <span className="hero-map-ping hero-map-ping-b" />
              <span className="hero-map-player hero-map-player-a">L</span>
              <span className="hero-map-player hero-map-player-b">A</span>
              <span className="hero-map-runner"><i /></span>
              <span className="hero-map-place hero-map-place-a" data-i18n="map.park">{english["map.park"]}</span>
              <span className="hero-map-place hero-map-place-b" data-i18n="map.path">{english["map.path"]}</span>
              <span className="hero-map-live"><i /><span data-i18n="map.status">{english["map.status"]}</span></span>
              <span className="hero-map-timer" data-i18n="map.timer">{english["map.timer"]}</span>
            </div>
            <div className="hero-copy">
              <div className="hero-copy-l">
                <span className="hero-tag" data-i18n="index.hero.tag">{english["index.hero.tag"]}</span>
                <h2 className="x" data-i18n="index.hero.title">{english["index.hero.title"]}</h2>
              </div>
              <div className="hero-copy-r">
                <p className="hero-snacks" data-i18n="index.hero.snacks">{english["index.hero.snacks"]}</p>
                <StoreButtons compact />
                <span className="hero-small" data-i18n="index.hero.small">{english["index.hero.small"]}</span>
              </div>
            </div>
          </div>
          <div className="phone-splash logo" aria-label="Hideya">
            <HideyaWordmark />
          </div>
          <div className="red-island" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}
