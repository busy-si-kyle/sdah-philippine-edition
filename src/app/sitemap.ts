import { MetadataRoute } from "next";
import { getAllHymns } from "@/lib/hymnal";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://sdah-philippine-edition.vercel.app";
    const hymns = getAllHymns();

    const hymnUrls = hymns.map((hymn) => ({
        url: `${baseUrl}/hymn/${hymn.number}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: `${baseUrl}/contribute`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        ...hymnUrls,
    ];
}
