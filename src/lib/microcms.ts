import type { MicroCMSListContent } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export type Blog = MicroCMSListContent & { title: string, content: string };

const allBlogIds: string[] = [];

export const getAllBlogIds = async () => {
  if (allBlogIds.length == 0) {
    allBlogIds.push(...await client.getAllContentIds({ endpoint: "blogs" }));
  }
  return allBlogIds;
}

const allBlogDetails = new Map<string, Blog>();

export const getBlogDetail = async (contentId: string) => {
  let blogDetail = allBlogDetails.get(contentId);
  if (!blogDetail) {
    blogDetail = await client.getListDetail<Blog>({
      endpoint: "blogs",
      contentId
    });
    allBlogDetails.set(contentId, blogDetail);
  }
  return blogDetail;
}

export const getAllBlogs = async () => {
  const blogInfos: Blog[] = [];
  for (let id of await getAllBlogIds()) {
    blogInfos.push(await getBlogDetail(id));
  }
  return blogInfos;
}

export const getBlogDetails = async ({ limit, offset }: { limit?: number, offset?: number }) => {
  const blogDetails = (await getAllBlogs()).sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)).reverse();
  const result = [];
  for (let i: number = 0; i < blogDetails.length; i++) {
    if (!!limit && i >= limit) break;
    const idx = i + (offset ?? 0);
    if (idx >= blogDetails.length) break;
    result.push(blogDetails[idx]);
  }
  return result;
}
