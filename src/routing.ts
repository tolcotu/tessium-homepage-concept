export const publicPages = [
  "streams",
  "pricing",
  "solutions",
  "coverage",
  "about",
  "blog",
  "contact",
  "terms",
  "privacy",
] as const;
export const pageHref = (page = "", hash = "") =>
  `${import.meta.env.BASE_URL}${page ? `?page=${encodeURIComponent(page)}` : ""}${hash ? `#${hash}` : ""}`;
export const currentPage =
  new URLSearchParams(window.location.search).get("page") || "";
