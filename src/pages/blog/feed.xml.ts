import rss, { type RSSFeedItem } from "@astrojs/rss";
import { getBlogs, type Blog } from "../../lib/microcms";

export const GET = async (context) => {
    const items: Array<RSSFeedItem> = (
        await getBlogs({ fields: ["id", "title", "publishedAt"], limit: 20 })
    ).contents
        .map((post: Blog) => ({
            title: post.title,
            pubDate: post.publishedAt,
            link: `/blog/${post.id}`,
        }));

    return rss({
        title: "misononoaのブログ",
        description: "misononoaのブログです。",
        site: "https://misononoa.cc/",
        items,
        customData: "<language>ja-jp</language>",
    });
};
