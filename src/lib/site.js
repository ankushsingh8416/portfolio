// Falls back to a placeholder — set NEXT_PUBLIC_SITE_URL in production so
// canonical/schema/sitemap URLs point at the real deployed domain.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ankushrajput.com";
