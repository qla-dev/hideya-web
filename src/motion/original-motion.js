// SCRAM landing page. Plays the app's launch splash, then drives the page: the red poster shrinking
// into the phone and walking through a round, the hunters' countdown, the Random picker, the
// feature loops, the privacy read-through and the progress runner.
//
// Motion numbers come from design_handoff_landing_page/README.md and, for the splash,
// design_handoff_splash_animation (option 1b). Game values match src/game/rules.ts in the app.

import hideyaSymbol from "../../assets/hideya/symbol-web.png";
import { translate } from "../copy";

export function initializeLandingPage() {
  "use strict";

  const abort = new AbortController();
  const timeoutIds = new Set();
  const intervalIds = new Set();
  const frameIds = new Set();
  const observers = [];
  let disposed = false;
  const setTimeout = (fn, delay) => {
    const id = window.setTimeout(() => {
      timeoutIds.delete(id);
      if (!disposed) fn();
    }, delay);
    timeoutIds.add(id);
    return id;
  };
  const setInterval = (fn, delay) => {
    const id = window.setInterval(() => {
      if (!disposed) fn();
    }, delay);
    intervalIds.add(id);
    return id;
  };
  const requestAnimationFrame = (fn) => {
    const id = window.requestAnimationFrame((time) => {
      frameIds.delete(id);
      if (!disposed) fn(time);
    });
    frameIds.add(id);
    return id;
  };
  const listen = (target, event, fn, options = {}) =>
    target.addEventListener(event, fn, { ...options, signal: abort.signal });
  class OwnedIntersectionObserver extends window.IntersectionObserver {
    constructor(...args) {
      super(...args);
      observers.push(this);
    }
  }

  window.hideya = true; // tells the fallback timer in <head> that the page is being looked after

  const doc = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cl = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
  const eio = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const ein = (t) => t * t * t;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const pad = (n) => String(n).padStart(2, "0");

  // Resolve on every access so running timers and picker results follow the
  // language selector without restarting the page or its animations.
  const T = new Proxy({}, { get: (_, key) => translate(`js.main.${key}`) });
  /** A string from T with its {{placeholders}} filled in. */
  const say = (key, vals) =>
    T[key].replace(/\{\{(\w+)\}\}/g, (_, k) => vals[k]);
  /** A number the page's language's way: 1.5 here, 1,5 in German. */
  const figure = (n) => {
    try {
      const f = new Intl.NumberFormat(doc.lang || undefined, {
        maximumFractionDigits: 1,
      });
      return f.format(n);
    } catch {
      return String(n);
    }
  };

  /** "04:32", like fmt() in the app. */
  const fmt = (sec) => {
    const v = Math.max(0, Math.ceil(sec));
    return `${pad(Math.floor(v / 60))}:${pad(v % 60)}`;
  };
  /** "0:28 ago", like ago() in the app. */
  const ago = (sec) =>
    say("ago", {
      time: `${Math.floor(sec / 60)}:${pad(Math.floor(sec % 60))}`,
    });
  /** "45 min", "1 h 30 min", like dur() in the app. */
  const dur = (min) =>
    min < 60
      ? say("minutes", { n: figure(min) })
      : min % 60
        ? say("hoursMinutes", {
            hours: figure(Math.floor(min / 60)),
            minutes: figure(min % 60),
          })
        : say("hours", { n: figure(min / 60) });

  /** Sets a style or custom property only when it changes: the scroll handler runs every frame. */
  function set(el, prop, val) {
    const c = el.__c || (el.__c = {});
    if (c[prop] === val) return;
    c[prop] = val;
    if (prop.startsWith("--")) el.style.setProperty(prop, val);
    else el.style[prop] = val;
  }

  // In-page links scroll to their section without writing #get or #top into the address bar, so
  // the URL stays scramhideandseek.com. A typed or shared deep link (/#get) still lands on its section.
  listen(document, "click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (
      !a ||
      e.defaultPrevented ||
      e.button ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    const el = document.getElementById(a.getAttribute("href").slice(1));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView(); // smooth via the CSS scroll-behavior, instant under Reduce Motion
    if (location.hash)
      history.replaceState(null, "", location.pathname + location.search);
  });

  // Launch splash: the app's "Skid in, scram out"
  // The letters skid in from the left (M first), hold until the page is ready, then dash off to the
  // right and the red slides away after them. Any tap, key or scroll skips the hold.

  function splash() {
    const root = $(".splash");
    const red = $(".splash-red");
    const logo = $(".splash-logo");
    const letters = $$(".logo-l", logo);
    const linesIn = $$(".splash-line.in");
    const linesOut = $$(".splash-line.out");
    const t0 = performance.now();
    const vw = root.clientWidth;
    const b = $(".splash-box").getBoundingClientRect();
    const k = b.width / 290; // the spec's distances are for a 290 pt logo
    const wIn = b.width * 0.76; // 220 pt lines against a 290 pt logo
    const wOut = b.width * 0.69; // 200 pt
    const intro = [];

    logo.classList.add("go");
    if (!reduced) {
      linesIn.concat(linesOut).forEach((el, i) => {
        el.style.left = `${-b.left}px`;
        el.style.width = `${i < linesIn.length ? wIn : wOut}px`;
      });
      linesIn.forEach((el, i) =>
        intro.push(
          el.animate(
            [
              { transform: `translateX(${-wIn}px) scaleX(.3)` },
              {
                transform: `translateX(${vw * 0.4}px) scaleX(1)`,
                offset: 0.55,
              },
              { transform: `translateX(${vw * 1.2}px) scaleX(.2)` },
            ],
            {
              duration: 560,
              delay: 100 + i * 45,
              easing: "cubic-bezier(.4,0,.6,1)",
              fill: "both",
            },
          ),
        ),
      );
      // Letters are in S C R A M order; M goes first. A negative skew leans into the motion.
      letters.forEach((el, i) =>
        intro.push(
          el.animate(
            [
              {
                transform: `translateX(${-(b.right + 80)}px) skewX(-28deg)`,
                easing: "cubic-bezier(.2,.8,.3,1)",
              },
              {
                transform: `translateX(${10 * k}px) skewX(12deg)`,
                offset: 0.62,
                easing: "cubic-bezier(.4,0,.2,1)",
              },
              { transform: "translateX(0) skewX(0deg)" },
            ],
            {
              duration: 620,
              delay: 160 + (letters.length - 1 - i) * 60,
              fill: "both",
            },
          ),
        ),
      );
    }

    const done = () => {
      doc.classList.remove("splash-on");
      root.remove();
    };

    let gone = false;
    const exit = () => {
      if (gone) return;
      gone = true;
      skip(false);
      intro.forEach((a) => a.finish());
      root.style.pointerEvents = "none";
      if (reduced) {
        heroIn(0);
        root
          .animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 300,
            easing: "ease-out",
            fill: "forwards",
          })
          .finished.then(done);
        return;
      }
      logo.animate(
        [
          {
            transform: "translateX(0) skewX(0deg)",
            easing: "cubic-bezier(.3,0,.2,1)",
          },
          {
            transform: `translateX(${-10 * k}px) skewX(8deg)`,
            offset: 0.3,
            easing: "cubic-bezier(.7,0,.84,0)",
          },
          { transform: `translateX(${vw - b.left + 80}px) skewX(-30deg)` },
        ],
        { duration: 520, fill: "forwards" },
      );
      linesOut.forEach((el, i) =>
        el.animate(
          [
            { transform: `translateX(${-wOut}px) scaleX(.2)` },
            { transform: `translateX(${vw * 1.25}px) scaleX(1.4)` },
          ],
          {
            duration: 380,
            delay: 130 + i * 30,
            easing: "cubic-bezier(.5,0,.5,1)",
            fill: "both",
          },
        ),
      );
      red
        .animate(
          [
            { transform: "translateX(0)" },
            { transform: `translateX(${vw}px)` },
          ],
          {
            duration: 560,
            delay: 260,
            easing: "cubic-bezier(.7,0,.2,1)",
            fill: "forwards",
          },
        )
        .finished.then(done);
      // As the red slides off to the right, the hero's own logo skids in from the left.
      heroIn(260);
    };

    const EVENTS = ["wheel", "touchstart", "pointerdown", "keydown"];
    const skip = (on) =>
      EVENTS.forEach((e) =>
        window[on ? "addEventListener" : "removeEventListener"](e, exit, {
          passive: true,
          signal: abort.signal,
        }),
      );
    skip(true);

    // Ready: the display font and the logo's letters are in. The exit never starts before 1.6 s.
    const symbol = new Image();
    symbol.src = hideyaSymbol;
    const art = [symbol.decode()];
    const fonts = document.fonts
      ? document.fonts.load("700 16px Fredoka")
      : null;
    Promise.race([Promise.all([fonts, ...art]).catch(() => {}), wait(3500)])
      .then(() => wait((reduced ? 700 : 1600) - (performance.now() - t0)))
      .then(exit);
  }

  // Hero entrance: splash 1b, scaled up to the poster

  function heroIn(delay) {
    const logo = $(".hero-logo");
    const letters = $$(".logo-l", logo);
    if (!reduced) {
      const box = logo.getBoundingClientRect();
      $$(".speed", logo).forEach((el, i) =>
        el.animate(
          [
            { transform: "translateX(-120vw) scaleX(.3)" },
            {
              transform: `translateX(${Math.round(box.width * 0.35)}px) scaleX(1)`,
              offset: 0.55,
            },
            { transform: "translateX(120vw) scaleX(.2)" },
          ],
          {
            duration: 760,
            delay: delay + 120 + i * 55,
            easing: "cubic-bezier(.4,0,.6,1)",
            fill: "both",
          },
        ),
      );
      letters.forEach((el, i) =>
        el.animate(
          [
            {
              transform: `translateX(${-(box.right + 80)}px) skewX(-28deg)`,
              easing: "cubic-bezier(.2,.8,.3,1)",
            },
            {
              transform: `translateX(${Math.round(box.width * 0.012)}px) skewX(12deg)`,
              offset: 0.62,
              easing: "cubic-bezier(.4,0,.2,1)",
            },
            { transform: "translateX(0) skewX(0deg)" },
          ],
          {
            duration: 720,
            delay: delay + 200 + (letters.length - 1 - i) * 70,
            fill: "both",
          },
        ),
      );
      $(".hero-copy").animate(
        [
          { opacity: 0, transform: "translateY(28px)" },
          { opacity: 1, transform: "translateY(-3px)", offset: 0.65 },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 700,
          delay: delay + 1050,
          easing: "cubic-bezier(.2,.7,.3,1)",
          fill: "backwards",
        },
      );
    }
    doc.classList.remove("pre");
  }

  // Drops: letters fall in, land squashed, bounce and settle

  function drop(letters, delay, stagger, img) {
    letters.forEach((el, i) => {
      el.getAnimations().forEach((a) => a.cancel());
      if (reduced) {
        el.style.opacity = "";
        return;
      }
      const t = { duration: 1000, delay: delay + i * stagger, fill: "both" };
      if (img) {
        el.animate(
          [
            {
              transform: "translateY(-120%) scale(1.7,1.12)",
              opacity: 0,
              easing: "cubic-bezier(.55,0,.9,.45)",
            },
            { opacity: 1, offset: 0.14 },
            {
              transform: "translateY(0) scale(1.28,.8)",
              offset: 0.52,
              easing: "cubic-bezier(.2,.8,.3,1)",
            },
            {
              transform: "translateY(-9%) scale(.96,1.05)",
              offset: 0.74,
              easing: "cubic-bezier(.4,0,.5,1)",
            },
            { transform: "translateY(0) scale(1,1)", opacity: 1 },
          ],
          t,
        );
        return;
      }
      el.animate(
        [
          {
            transform: "translateY(-115%) scale(1.02,1.12)",
            fontStretch: "125%",
            opacity: 0,
            easing: "cubic-bezier(.55,0,.9,.45)",
          },
          { opacity: 1, offset: 0.14 },
          {
            transform: "translateY(0) scale(1.12,.82)",
            fontStretch: "78%",
            offset: 0.52,
            easing: "cubic-bezier(.2,.8,.3,1)",
          },
          {
            transform: "translateY(-9%) scale(.97,1.05)",
            offset: 0.74,
            easing: "cubic-bezier(.4,0,.5,1)",
          },
          {
            transform: "translateY(0) scale(1,1)",
            fontStretch: "62.5%",
            opacity: 1,
          },
        ],
        t,
      );
    });
  }

  // The scroll-driven page

  // "Ready or not / Here we come" drops in a letter at a time, so each line becomes one <i> per
  // letter (and a narrow one per space). The page holds the lines as plain words, to translate.
  function splitReadyLetters() {
    $$(".ready-text > span").forEach((line) => {
    const chars = [...line.textContent.trim()];
    line.textContent = "";
    chars.forEach((ch) => {
      const i = document.createElement("i");
      if (/\s/.test(ch)) i.className = "sp";
      else {
        i.className = "rl";
        i.textContent = ch;
      }
      line.append(i);
    });
    });
  }
  splitReadyLetters();

  const E = {
    nav: $(".nav"),
    pinA: $(".pin-a"),
    stickA: $(".stick-a"),
    red: $(".red"),
    hero: $(".hero"),
    phoneSplash: $(".phone-splash"),
    redIsland: $(".red-island"),
    phone: $(".phone"),
    screen: $(".screen"),
    stepsUI: $(".steps-ui"),
    sb: $(".sb"),
    hostMap: $(".host-map"),
    hostRing: $(".host-ring"),
    zoneVal: $(".zone-val"),
    code: $$(".code span"),
    optX: $(".opt-x"),
    fair: $(".fair"),
    headTimer: $(".head-timer"),
    headBar: $(".head-bar"),
    pinB: $(".pin-b"),
    count: $(".count"),
    cdTicks: $$(".cd-ticks i"),
    ready: $(".ready"),
    readyL: $$(".rl"),
    runner: $(".runner"),
  };
  const scr = $$(".scr");
  const nums = $$(".num");
  const txts = $$(".txt");
  const ticks = $$(".tick");
  const themed = $$("[data-theme-at]");
  const hls = $$("[data-hl]");

  /** Corner radius of the frame image's screen opening (best fit to its squircle), for the red to land in. */
  const SCREEN_R = 64.5;

  // The Host step's zone: the three sizes it steps through, with the ring scaled to the real radius.
  const ZONE = [
    { r: 300, k: 0.5 },
    { r: 420, k: 0.7 },
    { r: 600, k: 1 },
  ];

  let step = -1;
  let zi = -1;
  let count = 1;
  let readyShown = false;
  let theme = null;
  let lastY;
  let bob = null;
  let bobT = 0;

  function setStep(i) {
    step = i;
    const show = (el, j) => {
      el.classList.toggle("on", j === i);
      el.classList.toggle("past", j < i);
    };
    scr.forEach(show);
    nums.forEach(show);
    txts.forEach(show);
    ticks.forEach((el, j) => {
      el.classList.toggle("on", j === i);
      el.classList.toggle("done", j < i);
    });
    E.sb.classList.toggle("light", i === 2);
  }

  function update() {
    const vh = innerHeight;
    const mobile = innerWidth < 960;
    E.nav.dataset.scrolled = String(scrollY > Math.min(180, vh * 0.3));

    // The phone (its body is 902.5 tall). Narrow screens put it at the top, with the step's words underneath.
    const phoneH = mobile ? Math.min(vh * 0.48, 460) : Math.min(vh * 0.78, 720);
    const k = phoneH / 902.5;
    const pcy = mobile ? 86 + phoneH / 2 : vh / 2;
    set(E.phone, "top", `${pcy.toFixed(1)}px`);
    set(E.phone, "transform", `translate(-50%,-50%) scale(${k.toFixed(4)})`);
    set(E.stickA, "--pbot", `${(pcy + phoneH / 2).toFixed(1)}px`);

    // Hero → phone: the poster clips down onto the phone's screen, then wipes off it.
    const s = -E.pinA.getBoundingClientRect().top / vh;
    const m = cl((s - 0.3) / 0.9);
    const em = eio(m);
    if (reduced) {
      set(E.red, "opacity", (1 - cl((s - 0.5) / 0.5)).toFixed(3));
      set(E.red, "visibility", s >= 1 ? "hidden" : "visible");
    } else {
      const st = E.stickA.getBoundingClientRect();
      const sr = E.screen.getBoundingClientRect();
      const T = sr.top - st.top;
      const L = sr.left - st.left;
      const R = st.right - sr.right;
      const B = st.bottom - sr.bottom;
      const e = cl((s - 1.2) / 0.5);
      const wipe = eio(e) * sr.width;
      set(
        E.red,
        "clipPath",
        `inset(${(T * em).toFixed(1)}px ${(R * em).toFixed(1)}px ${(B * em).toFixed(1)}px ${(L * em + wipe).toFixed(1)}px round ${(SCREEN_R * k * em).toFixed(1)}px)`,
      );
      set(E.red, "visibility", e >= 1 ? "hidden" : "visible");
      const cx = L + sr.width / 2;
      const cy = T + sr.height / 2;
      set(E.hero, "transformOrigin", `${cx.toFixed(1)}px ${cy.toFixed(1)}px`);
      set(
        E.hero,
        "transform",
        `scale(${(1 + (sr.width / st.width - 1) * em).toFixed(4)})`,
      );
      set(E.hero, "opacity", (1 - cl((m - 0.38) / 0.34)).toFixed(3));

      // The app's splash exit, on the phone: the logo winds up and dashes off as the red wipes away.
      const lw = sr.width * 0.72;
      const lh = (lw * 466) / 1260;
      const le = cl((s - 1.2) / 0.36);
      const dx =
        le < 0.2
          ? -8 * (le / 0.2)
          : -8 + ein((le - 0.2) / 0.8) * (sr.width * 1.2 + 8);
      const sk = le < 0.2 ? 8 * (le / 0.2) : 8 - 38 * ein((le - 0.2) / 0.8);
      set(E.phoneSplash, "width", `${lw.toFixed(1)}px`);
      set(E.phoneSplash, "height", `${lh.toFixed(1)}px`);
      set(E.phoneSplash, "left", `${(cx - lw / 2).toFixed(1)}px`);
      set(E.phoneSplash, "top", `${(cy - lh / 2).toFixed(1)}px`);
      set(E.phoneSplash, "opacity", cl((m - 0.7) / 0.22).toFixed(3));
      set(E.redIsland, "left", `${(L + 139 * k).toFixed(1)}px`);
      set(E.redIsland, "top", `${(T + 14.5 * k).toFixed(1)}px`);
      set(E.redIsland, "transform", `scale(${k.toFixed(4)})`);
      set(E.redIsland, "opacity", cl((m - 0.7) / 0.22).toFixed(3));
      set(
        E.phoneSplash,
        "transform",
        `translateX(${dx.toFixed(1)}px) skewX(${sk.toFixed(2)}deg)`,
      );
    }

    // The four steps.
    const kk = (s - 1.7) / 0.85;
    const idx = Math.max(0, Math.min(3, Math.floor(kk)));
    const f = s < 1.7 ? 0 : cl(kk - idx);
    set(E.stepsUI, "opacity", s > 1.45 ? "1" : "0");
    if (idx !== step) setStep(idx);

    // Host: the map slides under the zone, then the zone steps up a size or two.
    const f0 = idx > 0 ? 1 : f;
    const pan = 1 - eio(cl(f0 / 0.5));
    set(
      E.hostMap,
      "transform",
      `translate(${(pan * 48).toFixed(1)}px, ${(pan * -36).toFixed(1)}px)`,
    );
    const z = f0 < 0.6 ? 0 : f0 < 0.8 ? 1 : 2;
    if (z !== zi) {
      const grew = zi >= 0;
      zi = z;
      E.hostRing.style.transform = `scale(${ZONE[z].k})`;
      E.zoneVal.textContent = say("meters", { n: figure(ZONE[z].r) });
      if (grew && !reduced) {
        E.zoneVal.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.18)", offset: 0.4 },
            { transform: "scale(1)" },
          ],
          {
            duration: 320,
            easing: "cubic-bezier(.34,1.56,.64,1)",
          },
        );
      }
    }

    // Join: the code types itself in, then Random is picked.
    const f1 = idx > 1 ? 1 : idx < 1 ? 0 : f;
    const n = Math.min(6, Math.floor(cl(f1 / 0.45) * 6 + (f1 > 0 ? 0.5 : 0)));
    E.code.forEach((el, i) => el.classList.toggle("on", i < n));
    E.optX.classList.toggle("on", f1 > 0.55);
    E.fair.classList.toggle("on", f1 > 0.72);

    // Scatter: the head start runs down.
    const f2 = idx > 2 ? 1 : idx < 2 ? 0 : f;
    const ht = fmt(180 * (1 - f2));
    if (E.headTimer.textContent !== ht) E.headTimer.textContent = ht;
    set(E.headBar, "width", `${((1 - f2) * 100).toFixed(1)}%`);

    // Countdown: 1 to 10, then the red floods in and "Ready or not" drops.
    const rb = E.pinB.getBoundingClientRect();
    const c = cl(-rb.top / (rb.height - vh));
    const num = Math.min(10, 1 + Math.floor((c / 0.7) * 10));
    if (num !== count) {
      count = num;
      E.count.textContent = num;
      if (!reduced && rb.top < vh && rb.bottom > 0) {
        E.count.animate(
          [
            {
              transform: "translateY(-12%) scale(1.08,.9)",
              fontStretch: "100%",
              opacity: 0.2,
            },
            { transform: "translateY(2%) scale(.97,1.04)", offset: 0.6 },
            { transform: "none", fontStretch: "62.5%", opacity: 1 },
          ],
          { duration: 420, easing: "cubic-bezier(.2,.8,.3,1)" },
        );
      }
      E.cdTicks.forEach((el, i) => el.classList.toggle("on", i < num));
    }
    set(
      E.ready,
      "clipPath",
      `circle(${(eio(cl((c - 0.74) / 0.14)) * 125).toFixed(2)}vmax at 72% 64%)`,
    );
    if (c > 0.83 && !readyShown) {
      readyShown = true;
      drop(E.readyL, 0, 38);
    } else if (c < 0.72 && readyShown) {
      readyShown = false;
      E.readyL.forEach((el) => {
        el.getAnimations().forEach((a) => a.cancel());
        el.style.opacity = 0;
      });
    }

    // Nav colours follow whatever is under it.
    let t = "light";
    for (const el of themed) {
      const r = el.getBoundingClientRect();
      if (r.top <= 44 && r.bottom > 44) {
        const th = el.dataset.themeAt;
        t =
          th === "pinA"
            ? m < 0.55
              ? "red"
              : "light"
            : th === "pinB"
              ? c < 0.8
                ? "dark"
                : "red"
              : th;
        break;
      }
    }
    if (t !== theme) {
      theme = t;
      E.nav.dataset.theme = t;
    }

    // Privacy: each row lights up as it reaches the reading line.
    hls.forEach((el) => {
      const r = el.getBoundingClientRect();
      set(
        el,
        "opacity",
        (
          0.2 +
          0.8 * cl((vh * 0.8 - (r.top + r.height / 2)) / (vh * 0.3))
        ).toFixed(3),
      );
    });

    // The runner in the corner: scroll progress, with a bob while you scroll.
    const docH = doc.scrollHeight - vh;
    set(
      E.runner,
      "transform",
      `translateX(${((docH > 0 ? scrollY / docH : 0) * (E.runner.parentElement.clientWidth - 50)).toFixed(1)}px)`,
    );
    if (bob && lastY !== undefined && lastY !== scrollY) {
      bob.play();
      clearTimeout(bobT);
      bobT = setTimeout(() => bob.pause(), 160);
    }
    lastY = scrollY;
  }

  // Reveal on enter

  function pops() {
    const close = $("#get");
    const closeL = $$(".close-logo .logo-l");
    if (reduced) return;
    const io = new OwnedIntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          io.unobserve(el);
          if (el === close) {
            drop(closeL, 150, 90, true);
            return;
          }
          const a = el.animate(
            [
              { opacity: 0, transform: "translateY(48px) scale(.97)" },
              {
                opacity: 1,
                transform: "translateY(-5px) scale(1.006)",
                offset: 0.62,
              },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 780,
              delay: +(el.dataset.popDelay || 0),
              easing: "cubic-bezier(.2,.7,.3,1)",
              fill: "forwards",
            },
          );
          a.onfinish = () => {
            el.style.opacity = "";
            el.style.transform = "";
            a.cancel();
          };
        }),
      { threshold: 0.12 },
    );
    const vh = innerHeight;
    $$("[data-pop]")
      .filter((el) => el.getBoundingClientRect().top > vh * 0.9)
      .forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(48px) scale(.97)";
        io.observe(el);
      });
    if (close.getBoundingClientRect().top > vh * 0.9) {
      closeL.forEach((el) => (el.style.opacity = 0));
      io.observe(close);
    }
  }

  // Loops: the live bits in the phone and the feature cards

  function loops() {
    const inf = Infinity;
    const timers = [];
    const every = (ms, fn) => {
      fn();
      timers.push(setInterval(fn, ms));
    };
    const features = $("#features");
    let featuresOn = false;

    // Hunt screen: pings pulse, teammates drift, and the next ping counts down on a 5 min timer.
    const pingTimer = $(".hunt-head .timer");
    const pingAgo = $(".ping-ago");
    let left = 272;
    every(1000, () => {
      left = left <= 0 ? 300 : left - (reduced ? 0 : 1);
      pingTimer.textContent = fmt(left);
      pingAgo.textContent = ago(300 - left);
    });

    // Pings, not live tracking: the runner jumps from ping to ping, and the old spot fades out.
    const P = [
      [24, 72],
      [34, 55],
      [47, 62],
      [58, 44],
      [70, 52],
      [79, 34],
      [63, 24],
      [46, 32],
      [32, 40],
      [22, 54],
    ];
    const pg0 = $(".pg0");
    const pg1 = $(".pg1");
    const pgAgo = $(".pg-ago");
    let pi = 0;
    let pingAt = performance.now();
    const ping = () => {
      pg1.style.left = `${P[pi][0]}%`;
      pg1.style.top = `${P[pi][1]}%`;
      pi = (pi + 1) % P.length;
      pg0.style.left = `${P[pi][0]}%`;
      pg0.style.top = `${P[pi][1]}%`;
      pingAt = performance.now();
      pgAgo.textContent = ago(0);
      pg1.animate([{ opacity: 0.55 }, { opacity: 0 }], {
        duration: 900,
        easing: "ease-out",
        fill: "forwards",
      });
      $(".pg-ring").animate(
        [
          { transform: "scale(1)", opacity: 0.9 },
          { transform: "scale(5)", opacity: 0 },
        ],
        {
          duration: 1500,
          easing: "cubic-bezier(.2,.8,.3,1)",
        },
      );
      $(".pg-dot").animate(
        [
          { transform: "scale(0)" },
          { transform: "scale(1.3)", offset: 0.6 },
          { transform: "scale(1)" },
        ],
        {
          duration: 480,
          easing: "cubic-bezier(.3,0,.3,1)",
        },
      );
      $(".pg-chip").animate(
        [
          { transform: "scale(.5)", opacity: 0 },
          { transform: "scale(1.06)", opacity: 1, offset: 0.6 },
          { transform: "scale(1)", opacity: 1 },
        ],
        {
          duration: 480,
          delay: 80,
          fill: "backwards",
          easing: "cubic-bezier(.3,0,.3,1)",
        },
      );
    };
    if (!reduced) {
      timers.push(setInterval(() => featuresOn && ping(), 2200));
      timers.push(
        setInterval(() => {
          if (featuresOn)
            pgAgo.textContent = ago((performance.now() - pingAt) / 1000);
        }, 250),
      );
    }

    // The host's rules, snapped to the values the app offers.
    const ROUNDS = [10, 15, 20, 30, 45, 60, 90, 120, 150, 180];
    const PINGS = [1, 2, 3, 5, 10, 15, 20, 30];
    const HEADS = [0, 1, 2, 3, 5, 10, 15];
    const ZONES = [200, 300, 420, 600, 800, 1000, 1500]; // radius, m
    const across = (r) =>
      r * 2 < 1000
        ? say("acrossMeters", { n: figure(r * 2) })
        : say("acrossKm", { n: figure(+((r * 2) / 1000).toFixed(1)) });
    const SLIDERS = [
      { opts: ROUNDS, now: 45, label: dur },
      { opts: PINGS, now: 5, label: dur },
      { opts: HEADS, now: 3, label: (v) => (v ? dur(v) : T.none) },
      { opts: ZONES, now: 420, label: across },
    ].map((o, i) => {
      const el = $$(".slider")[i];
      return {
        ...o,
        knob: $(".knob", el),
        fill: $(".track-fill", el),
        val: $(".val", el),
      };
    });
    const slide = (sl, v) => {
      sl.knob.style.left = `${(v * 100).toFixed(2)}%`;
      sl.fill.style.width = `${(v * 100).toFixed(2)}%`;
      const txt = sl.label(sl.opts[Math.round(v * (sl.opts.length - 1))]);
      if (sl.val.textContent !== txt) sl.val.textContent = txt;
    };
    SLIDERS.forEach((sl) =>
      slide(sl, sl.opts.indexOf(sl.now) / (sl.opts.length - 1)),
    );
    if (!reduced) {
      timers.push(
        setInterval(() => {
          if (!featuresOn) return;
          const tt = performance.now() / 1000;
          SLIDERS.forEach((sl, i) =>
            slide(sl, (Math.sin(tt * 0.55 + i * 1.6) + 1) / 2),
          );
        }, 40),
      );
    }

    // Visible-only: the feature loops pause while the section is off screen.
    new OwnedIntersectionObserver(([en]) => {
      featuresOn = en.isIntersecting;
      features
        .getAnimations({ subtree: true })
        .filter(
          (a) => a.effect && a.effect.getComputedTiming().iterations === inf,
        )
        .forEach((a) => (featuresOn ? a.play() : a.pause()));
    }).observe(features);

    if (reduced) return;
    ping();

    // Shrinking zone: three equal shrinks down to the final size (36% of the start, as in the app),
    // each announced a minute ahead with the new edge dashed in. After the second, the runner is
    // left outside: 30 s later the hunters see them live.
    const S = [1, 0.787, 0.573, 0.36];
    const ez = "cubic-bezier(.5,0,.2,1)";
    $(".zone-ring").animate(
      [
        { transform: `scale(${S[0]})`, offset: 0 },
        { transform: `scale(${S[0]})`, offset: 0.22, easing: ez },
        { transform: `scale(${S[1]})`, offset: 0.28 },
        { transform: `scale(${S[1]})`, offset: 0.5, easing: ez },
        { transform: `scale(${S[2]})`, offset: 0.56 },
        { transform: `scale(${S[2]})`, offset: 0.8, easing: ez },
        { transform: `scale(${S[3]})`, offset: 0.86 },
        { transform: `scale(${S[3]})`, offset: 0.95, easing: ez },
        { transform: `scale(${S[0]})`, offset: 1 },
      ],
      { duration: 10000, iterations: inf },
    );
    const warn = [
      [0.1, 0.22],
      [0.38, 0.5],
      [0.68, 0.8],
    ];
    const blink = (scale) =>
      warn.flatMap(([a, b], i) => [
        {
          opacity: 0,
          offset: a,
          ...(scale && { transform: `scale(${S[i + 1]})` }),
        },
        {
          opacity: 1,
          offset: a + 0.02,
          ...(scale && { transform: `scale(${S[i + 1]})` }),
        },
        {
          opacity: 1,
          offset: b,
          ...(scale && { transform: `scale(${S[i + 1]})` }),
        },
        {
          opacity: 0,
          offset: b + 0.02,
          ...(scale && { transform: `scale(${S[i + 1]})` }),
        },
      ]);
    $(".zone-warn").animate(
      [{ opacity: 0, offset: 0 }, ...blink(false), { opacity: 0, offset: 1 }],
      { duration: 10000, iterations: inf },
    );
    $(".zone-next").animate(
      [
        { opacity: 0, transform: `scale(${S[1]})`, offset: 0 },
        ...blink(true),
        { opacity: 0, transform: `scale(${S[3]})`, offset: 1 },
      ],
      { duration: 10000, iterations: inf },
    );
    const live = [
      { opacity: 0, offset: 0 },
      { opacity: 0, offset: 0.64 },
      { opacity: 1, offset: 0.66 },
      { opacity: 1, offset: 0.95 },
      { opacity: 0, offset: 0.96 },
      { opacity: 0, offset: 1 },
    ];
    $(".live-chip").animate(live, { duration: 10000, iterations: inf });
    $(".live-ring").animate(
      live.map((kf) => ({
        ...kf,
        transform: kf.opacity ? "scale(1.3)" : "scale(.6)",
      })),
      { duration: 10000, iterations: inf },
    );

    // Team Radio and the lock screen: messages pop in, hold, then clear for the next pass.
    const bub = (a) => [
      { opacity: 0, transform: "translateY(16px) scale(.88)", offset: 0 },
      { opacity: 0, transform: "translateY(16px) scale(.88)", offset: a },
      {
        opacity: 1,
        transform: "translateY(-3px) scale(1.04)",
        offset: a + 0.05,
      },
      { opacity: 1, transform: "none", offset: a + 0.08 },
      { opacity: 1, transform: "none", offset: 0.88 },
      { opacity: 0, transform: "translateY(-8px) scale(.98)", offset: 0.94 },
      { opacity: 0, transform: "translateY(16px) scale(.88)", offset: 1 },
    ];
    [0.03, 0.18, 0.36, 0.54].forEach((a, i) =>
      $(`.r${i}`).animate(bub(a), { duration: 8500, iterations: inf }),
    );
    [0.06, 0.28, 0.5].forEach((a, i) =>
      $(`.n${i}`).animate(bub(a), { duration: 8500, iterations: inf }),
    );
    $(".buzz").animate(
      [
        { transform: "rotate(0)" },
        { transform: "rotate(-4deg)", offset: 0.04 },
        { transform: "rotate(4deg)", offset: 0.08 },
        { transform: "rotate(-4deg)", offset: 0.12 },
        { transform: "rotate(3deg)", offset: 0.16 },
        { transform: "rotate(0)", offset: 0.2 },
        { transform: "rotate(0)" },
      ],
      { duration: 1800, iterations: inf },
    );

    // Your team, live.
    const paths = [
      [
        [25, 30],
        [40, 22],
        [55, 28],
        [48, 40],
        [30, 38],
      ],
      [
        [70, 62],
        [78, 48],
        [66, 40],
        [60, 58],
        [72, 72],
      ],
      [
        [40, 75],
        [28, 66],
        [22, 80],
        [36, 86],
        [48, 80],
      ],
    ];
    paths.forEach((pts, i) =>
      $(`.tm${i}`).animate(
        [...pts, pts[0]].map(([x, y]) => ({ left: `${x}%`, top: `${y}%` })),
        {
          duration: 10000 + i * 2200,
          iterations: inf,
          easing: "ease-in-out",
        },
      ),
    );

    // The hunt screen in the phone.
    $$(".ping-ring").forEach((el, i) =>
      el.animate(
        [
          { transform: "scale(1)", opacity: 0.8 },
          { transform: "scale(3.4)", opacity: 0 },
        ],
        {
          duration: 1800,
          delay: i * 500,
          iterations: inf,
          easing: "cubic-bezier(.2,.8,.3,1)",
        },
      ),
    );
    $(".hm0").animate(
      [
        { left: "110px", top: "560px" },
        { left: "150px", top: "520px" },
        { left: "130px", top: "470px" },
        { left: "110px", top: "560px" },
      ],
      { duration: 9000, iterations: inf, easing: "ease-in-out" },
    );
    $(".hm1").animate(
      [
        { left: "300px", top: "250px" },
        { left: "290px", top: "320px" },
        { left: "250px", top: "300px" },
        { left: "300px", top: "250px" },
      ],
      { duration: 11000, iterations: inf, easing: "ease-in-out" },
    );

    bob = E.runner.firstElementChild.animate(
      [
        { transform: "translateY(0) rotate(0deg)" },
        { transform: "translateY(2px) rotate(-6deg)" },
        { transform: "translateY(0) rotate(0deg)" },
      ],
      { duration: 260, iterations: inf },
    );
    bob.pause();
  }

  // Pick a side: Random flicks between the teams and lands on one

  function picker() {
    const btn = $(".rand");
    const label = $(".rand .x");
    const status = $('.sides [role="status"]');
    const side = [$(".side-h"), $(".side-r")];
    const you = side.map((el) => $(".you", el));
    const big = side.map((el) => $(".big", el));
    let spinning = false;

    const light = (w) =>
      side.forEach((el, i) => {
        el.style.transform = i === w ? "scale(1.015)" : "scale(.975)";
        el.style.opacity = i === w ? 1 : 0.55;
      });

    const land = (w) => {
      you[w].classList.add("on");
      if (!reduced) {
        big[w].animate(
          [
            { transform: "scale(.9)", fontStretch: "100%" },
            { transform: "scale(1.05)", offset: 0.6 },
            { transform: "scale(1)", fontStretch: "125%" },
          ],
          { duration: 560, easing: "cubic-bezier(.3,0,.3,1)" },
        );
      }
      status.textContent = w === 0 ? T.hunter : T.runner;
      setTimeout(() => side.forEach((el) => (el.style.opacity = 1)), 1400);
      label.textContent = T.again;
      spinning = false;
    };

    btn.addEventListener("click", () => {
      if (spinning) return;
      spinning = true;
      // Random tops the hunters up towards one in four players, so it usually lands on Runner.
      const w = Math.random() < 0.25 ? 0 : 1;
      you.forEach((el) => el.classList.remove("on"));
      if (reduced) {
        light(w);
        land(w);
        return;
      }
      const flips = 11 + (w === 1 ? 0 : 1);
      let n = 0;
      const tick = () => {
        light(n % 2);
        n++;
        if (n <= flips) setTimeout(tick, 55 + n * n * 3.2);
        else land(w);
      };
      tick();
    });
  }

  // Start

  // The splash starts the page from the top. Deep links (/#features) skip it and keep their place.
  if (!location.hash && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
    scrollTo(0, 0);
  }
  E.readyL.forEach((el) => (el.style.opacity = 0));
  setStep(0);
  update();
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  };
  listen(window, "scroll", onScroll, { passive: true });
  listen(window, "resize", onScroll);
  listen(window, "hideya:languagechange", () => {
    splitReadyLetters();
    E.readyL = $$(".rl");
    E.readyL.forEach((el) => { el.style.opacity = readyShown ? 1 : 0; });
    zi = -1;
    update();
  });
  pops();
  loops();
  picker();
  if (doc.classList.contains("splash-on")) splash();
  else heroIn(0);

  return () => {
    disposed = true;
    abort.abort();
    timeoutIds.forEach((id) => window.clearTimeout(id));
    intervalIds.forEach((id) => window.clearInterval(id));
    frameIds.forEach((id) => window.cancelAnimationFrame(id));
    observers.forEach((observer) => observer.disconnect());
    document
      .querySelector("#root")
      ?.getAnimations({ subtree: true })
      .forEach((animation) => animation.cancel());
    document.documentElement.classList.remove("pre", "splash-on", "js");
  };
}
