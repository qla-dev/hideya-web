import { english } from "../copy";

// Both destinations are intentionally blank until the store URLs are supplied.
const storeURLs: Record<"ios" | "android", string> = { ios: "", android: "" };

const icons: Record<"ios" | "android", string> = {
  ios: "M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.17-1.53 2.65-.39 6.58 1.1 8.73.73 1.05 1.6 2.23 2.73 2.19 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.29-.88-2.3-3.48zM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.03-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21z",
  android: "M17.6 9.48l1.84-3.18a.38.38 0 0 0-.66-.38l-1.86 3.22a11.4 11.4 0 0 0-9.84 0L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z",
};

export function StoreButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className="store-downloads">
      {!compact && <span className="store-available" data-i18n="store.caption">{english["store.caption"]}</span>}
      <div className="btns">
        {(["ios", "android"] as const).map((platform) => {
          const key = platform === "ios" ? "index.hero.iphone" : "index.getAndroid";
          const className = `btn btn-store ${compact ? "" : "btn-lg "}btn-white`;
          // The label has its own span: translation replaces textContent, which would drop the icon.
          const content = (
            <>
              <svg className="store-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={icons[platform]} /></svg>
              <span data-i18n={key}>{english[key]}</span>
            </>
          );
          return storeURLs[platform] ? (
            <a key={platform} className={className} href={storeURLs[platform]} data-store={platform}>{content}</a>
          ) : (
            <button key={platform} className={className} type="button" disabled data-store={platform} data-download-placeholder="" title={english["store.placeholder"]} data-i18n-attr="title:store.placeholder">{content}</button>
          );
        })}
      </div>
    </div>
  );
}
