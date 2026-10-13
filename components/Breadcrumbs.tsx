import Link from "next/link";

export type Crumb = { name: string; href?: string };

// Visible navigation breadcrumbs. The last crumb is the current page and is
// not a link. Screen readers get a labelled nav with an ordered list, and the
// separator is hidden from the accessibility tree so it is not read aloud.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.name}>
              {c.href && !isLast ? (
                <Link href={c.href}>{c.name}</Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{c.name}</span>
              )}
              {!isLast && (
                <span className="crumb-sep" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
