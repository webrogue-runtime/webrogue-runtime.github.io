import type { MetadataRoute } from 'next'
import { parseAll } from "@/markdown";

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return (await parseAll()).map((entry) => {
        let url = 'https://webrogue.dev/' + entry.path;
        if (url.endsWith("/index")) {
            url = url.slice(0, url.length - "index".length);
        } else {
            url += ".html"
        }
        return {
            url: url,
            lastModified: new Date(),
        }
    });
}
