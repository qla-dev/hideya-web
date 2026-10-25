import { HideyaWordmark } from "./HideyaWordmark";
export function LaunchSplash() {
  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-red">
        <div className="splash-box">
          <i className="splash-line in" style={{ top: "10.8%" }}></i>
          <i className="splash-line in" style={{ top: "31.3%" }}></i>
          <i className="splash-line in" style={{ top: "53.7%" }}></i>
          <i className="splash-line in" style={{ top: "74.2%" }}></i>
          <i className="splash-line in" style={{ top: "94.7%" }}></i>
          <i className="splash-line out" style={{ top: "13.6%" }}></i>
          <i className="splash-line out" style={{ top: "41.6%" }}></i>
          <i className="splash-line out" style={{ top: "64%" }}></i>
          <i className="splash-line out" style={{ top: "84.5%" }}></i>
          <i className="splash-line out" style={{ top: "97.5%" }}></i>
          <div className="splash-logo logo" aria-label="Hideya">
            <HideyaWordmark />
          </div>
        </div>
      </div>
    </div>
  );
}
