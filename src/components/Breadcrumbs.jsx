import Link from "next/link";

const SITE_URL = "https://autoklass42.ru";

export default function Breadcrumbs({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <nav aria-label="Хлебные крошки" className="bg-asphalt-950 pt-28 pb-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wide text-fog-dim">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span className="text-fog" aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-line transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
