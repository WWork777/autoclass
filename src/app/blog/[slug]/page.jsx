import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS, getPostBySlug } from "@/lib/data";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} — блог автошколы «Автокласс»`,
    description: post.description,
    path: `/blog/${post.slug}/`,
    ogImage: post.cover,
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = (post.relatedSlugs || []).map(getPostBySlug).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.cover}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "EducationalOrganization", name: "Автошкола Автокласс", sameAs: SITE_URL },
  };

  return (
    <>
      <Header />
      <JsonLd data={jsonLd} />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/blog/", label: "Блог" },
            { href: `/blog/${post.slug}/`, label: post.title },
          ]}
        />

        <article className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <time dateTime={post.date} className="font-mono text-xs text-fog-dim uppercase">
              {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
              {" · "}{post.author}
            </time>
            <h1 className="font-display uppercase text-3xl sm:text-5xl leading-[1.02] mt-4 text-balance">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.06} className="relative aspect-[16/9] overflow-hidden mt-10">
            <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-5">
            {post.content.map((p, i) => (
              <p key={i} className="text-fog-dim leading-relaxed text-lg">{p}</p>
            ))}
          </Reveal>

          {related.length > 0 && (
            <div className="mt-16 border-t border-asphalt-700 pt-8">
              <h2 className="font-display uppercase text-xl">Читайте также</h2>
              <div className="mt-4 flex flex-col gap-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}/`} className="text-blue hover:text-line transition-colors">
                    {r.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
