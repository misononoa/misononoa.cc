import type { MicroCMSListContent, MicroCMSListResponse } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export type BlogInfo = MicroCMSListContent & { title: string };
const blogInfoKeys = new Set([
  "id",
  "title",
  "createdAt",
  "updatedAt",
  "publishedAt",
  "revisedAt"
]) satisfies ReadonlySet<keyof BlogInfo>;

export type Blog = BlogInfo & { content: string };
const blogKeys = new Set([
  ...blogInfoKeys,
  "content"
]) satisfies ReadonlySet<keyof Blog>;

export const getBlogInfos = ({ limit, offset }: { limit?: number, offset?: number }) => {
  return client.get<MicroCMSListResponse<BlogInfo>>({
    endpoint: "blogs",
    queries: {
      limit,
      offset,
      fields: [...blogInfoKeys]
    }
  });
}

export const getAllBlogInfos = async () => {
  return await client.getAllContents<BlogInfo>({
    endpoint: "blogs",
    queries: { fields: [...blogInfoKeys] }
  });
}

export const getAllBlogIds = async () =>
  await client.getAllContentIds({ endpoint: "blogs" });

export const getBlogDetail = async (contentId: string) => {
  return await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId
  });
}

export const getBlogDetails = async ({ limit, offset }: { limit?: number, offset?: number }) => {
  return client.get<MicroCMSListResponse<Blog>>({
    endpoint: "blogs",
    queries: {
      limit, offset,
      fields: [...blogKeys]
    }
  });
}