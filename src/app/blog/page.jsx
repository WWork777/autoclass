import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Блог автошколы «Автокласс» — статьи об обучении вождению",
  description: "Практические статьи автошколы «Автокласс»: документы для получения прав, этапы обучения, подготовка к экзамену в ГИБДД.",
  path: "/blog/",
});

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-24">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/blog/", label: "Блог" }]} />
        <PageHeader kicker="Блог" title="Статьи об обучении вождению" />

        <div className="mx-auto max-w-4xl px-5 sm:px-8 divide-y divide-asphalt-700 border-t border-b border-asphalt-700">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06} className="py-8">
              <Link href={`/blog/${post.slug}/`} className="group block">
                <time dateTime={post.date} className="font-mono text-xs text-fog-dim uppercase">
                  {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                </time>
                <h2 className="font-display uppercase text-2xl sm:text-3xl mt-2 group-hover:text-line transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-fog-dim leading-relaxed max-w-2xl">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
