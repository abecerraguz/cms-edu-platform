import type { MetadataRoute } from "next";
import { getSemanas } from "@/lib/semanas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://react-ts.abecerraguz.com";

  const semanas = getSemanas();

  const semanaUrls: MetadataRoute.Sitemap = semanas.map((s) => ({
    url: `${baseUrl}/semanas/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...semanaUrls,
  ];
}
