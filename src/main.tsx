import { createRoot } from "react-dom/client";
import App from "./App";
import { PreviewDocuments } from "./components/PreviewDocuments";

const page = new URLSearchParams(location.search).get("page");
createRoot(document.getElementById("root")!).render(
  page === "terms" || page === "support" ? (
    <PreviewDocuments page={page} />
  ) : (
    <App />
  ),
);
