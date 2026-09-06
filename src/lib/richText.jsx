import Link from "next/link";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders `[label](href)` markdown-style links inside a plain string as real
 * <Link>/<a> elements, leaving surrounding text untouched. Internal (site-relative)
 * hrefs use next/link; anything else opens in a new tab.
 */
export function renderRichText(text) {
  if (!text || !text.includes("](")) return text;

  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    parts.push(
      href.startsWith("/") ? (
        <Link href={href} key={key++}>
          {label}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noreferrer" key={key++}>
          {label}
        </a>
      )
    );
    lastIndex = LINK_PATTERN.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return parts;
}
