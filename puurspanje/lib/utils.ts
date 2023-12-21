import remark from "remark";
import html from "remark-html";

export const formatPrice = (price: number) => {
  return price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export function getMediaUrl(url: string) {
  return url.startsWith("/") ? `http://localhost:1337${url}` : url;
}

export function formatDate(date: string) {
  if (!date) return null;
  return new Intl.DateTimeFormat("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
