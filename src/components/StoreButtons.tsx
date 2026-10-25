import { english } from "../copy";

// Both destinations are intentionally blank until the store URLs are supplied.
const storeURLs: Record<"ios" | "android", string> = { ios: "", android: "" };

export function StoreButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className="store-downloads">
      {!compact && <span className="store-available" data-i18n="store.caption">{english["store.caption"]}</span>}
      <div className="btns">
        {(["ios", "android"] as const).map((platform) => {
          const key = platform === "ios" ? "index.hero.iphone" : "index.getAndroid";
          const className = `btn ${compact ? "" : "btn-lg "}${platform === "ios" ? "btn-white" : "btn-outline"}`;
          return storeURLs[platform] ? (
            <a key={platform} className={className} href={storeURLs[platform]} data-store={platform} data-i18n={key}>{english[key]}</a>
          ) : (
            <button key={platform} className={className} type="button" disabled data-store={platform} data-download-placeholder="" title={english["store.placeholder"]} data-i18n={key} data-i18n-attr="title:store.placeholder">{english[key]}</button>
          );
        })}
      </div>
    </div>
  );
}
