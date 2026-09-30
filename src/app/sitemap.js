import { INSTRUCTORS, BLOG_POSTS } from "@/lib/data";

const base = "https://autoklass42.ru";
const now = new Date();

const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/obuchenie/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/obuchenie/kategoriya-b/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/obuchenie/kategoriya-b/mkpp/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/obuchenie/kategoriya-b/akpp/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/obuchenie/kategoriya-a/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/obuchenie/perepodgotovka-s-na-b/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/obuchenie/perepodgotovka-d-na-b/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tseny/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/instruktory/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/avtodrom/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/aktsii/", priority: 0.6, changeFrequency: "weekly" },
  { path: "/otzyvy/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/galereya/", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kontakty/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/blog/", priority: 0.5, changeFrequency: "weekly" },
  { path: "/documents/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/agreement/", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const instructorEntries = INSTRUCTORS.map((i) => ({
    url: `${base}/instruktory/${i.slug}/`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const blogEntries = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}/`,
    lastModified: p.date,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  return [...staticEntries, ...instructorEntries, ...blogEntries];
}
