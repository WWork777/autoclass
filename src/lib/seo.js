export const SITE_URL = "https://autoklass42.ru";

export function buildMetadata({ title, description, path, ogImage = "/images/gallery1.jpg" }) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Автокласс",
      locale: "ru_RU",
      type: "website",
      images: [{ url: ogImage }],
    },
  };
}
