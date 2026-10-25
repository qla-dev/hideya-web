// Big display words (the phone's "Stay elusive.", the role cards) are sized
// for English; a longer translation would break a word mid-way. Shrink each one
// until its longest word fits its box, after every language change and resize.
const SELECTOR = ".run-big, .side .big";

function fit(el: HTMLElement) {
  el.style.fontSize = "";
  // Words wrap only between words while measuring.
  el.style.overflowWrap = "normal";
  el.style.wordBreak = "keep-all";
  const base = parseFloat(getComputedStyle(el).fontSize);
  let size = base;
  for (let i = 0; i < 24 && el.scrollWidth > el.clientWidth + 1 && size > base * 0.35; i++) {
    size *= 0.94;
    el.style.fontSize = `${size}px`;
  }
}

export function initializeFitText() {
  const run = () => document.querySelectorAll<HTMLElement>(SELECTOR).forEach(fit);
  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(run);
  };
  schedule();
  void document.fonts?.ready.then(schedule);
  window.addEventListener("hideya:languagechange", schedule);
  window.addEventListener("resize", schedule);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("hideya:languagechange", schedule);
    window.removeEventListener("resize", schedule);
  };
}
