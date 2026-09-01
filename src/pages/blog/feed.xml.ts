import rss from "@astrojs/rss";
import { getBlogDetails, type Blog } from "@lib/microcms";
import { parseISO } from "date-fns";

export const GET = async () => {
    const blogDetails: Blog[] = (
        await getBlogDetails({ limit: 20 })
    );
    return rss({
        title: "misononoaのブログ",
        description: "misononoaのブログです。",
        site: "https://misononoa.cc/",
        items: blogDetails.map((post: Blog) => ({
            title: post.title,
            pubDate: !!post.publishedAt ? parseISO(post.publishedAt) : undefined,
            link: `/blog/${post.id}`,
        })),
        customData: "<language>ja-jp</language>",
    });
};
