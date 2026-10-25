import { english } from "./copy";
import { useEffect, useRef } from "react";
import { LaunchSplash } from "./components/LaunchSplash";
import { Navigation } from "./components/Navigation";
import { HeroWalkthrough } from "./components/HeroWalkthrough";
import { HuntersCountdown } from "./components/HuntersCountdown";
import { RolePicker } from "./components/RolePicker";
import { Features } from "./components/Features";
import { Privacy } from "./components/Privacy";
import { PowerUps } from "./components/PowerUps";
import { GetTheApp } from "./components/GetTheApp";
import { ProgressRunner } from "./components/ProgressRunner";
import { initializeLandingPage } from "./motion/original-motion";
import { initializeLanguages } from "./language";
import { initializeFitText } from "./fit-text";
import "./styles/original-layout.css";
import "./styles/hideya-brand.css";

export default function App() {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    document.documentElement.classList.add("js", "pre");
    if (!location.hash) document.documentElement.classList.add("splash-on");
    const stopLanguage = initializeLanguages();
    const stopFit = initializeFitText();
    const stopMotion = initializeLandingPage();
    // React renders after the browser's first anchor lookup. Resolve direct
    // links once the complete original page exists, then let its scroll engine run.
    const anchorFrame = requestAnimationFrame(() => {
      if (location.hash)
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ behavior: "instant" });
    });
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest('a[href="#community"]');
      if (link) {
        event.preventDefault();
        dialog.current?.showModal();
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(anchorFrame);
      stopMotion();
      stopLanguage();
      stopFit();
      document.removeEventListener("click", onClick);
    };
  }, []);
  return (
    <>
      <LaunchSplash />
      <Navigation />
      <main>
        <HeroWalkthrough />
        <HuntersCountdown />
        <RolePicker />
        <Features />
        <PowerUps />
        <Privacy />
        <GetTheApp />
      </main>
      <ProgressRunner />
      <dialog ref={dialog} className="community-dialog" id="community">
        <h2 data-i18n="community.title">{english["community.title"]}</h2>
        <p data-i18n="community.text">{english["community.text"]}</p>
        <p data-i18n="community.note">{english["community.note"]}</p>
        <button
          className="btn btn-ink"
          data-i18n="common.close"
          type="button"
          onClick={() => dialog.current?.close()}
        >{english["common.close"]}</button>
      </dialog>
    </>
  );
}
