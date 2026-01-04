import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://sdah-philippine-edition.vercel.app";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
