import rss from "@astrojs/rss";
import { getBlogDetails, type Blog } from "lib/microcms";

export const GET = async () => {
    const blogDetails: Blog[] = (
        await getBlogDetails({ limit: 20 })
    ).contents;
    return rss({
        title: "misononoaのブログ",
        description: "misononoaのブログです。",
        site: "https://misononoa.cc/",
        items: blogDetails.map((post: Blog) => ({
            title: post.title,
            pubDate: new Date(post.publishedAt ?? ""),
            link: `/blog/${post.id}`,
        })),
        customData: "<language>ja-jp</language>",
    });
};
