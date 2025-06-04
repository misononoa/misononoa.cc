import type { MicroCMSListContent, MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});


export type BlogInfo = MicroCMSListContent & { title: string };
const blogInfoFieldNames = ["id", "title", "createdAt", "updatedAt", "publishedAt", "revisedAt"];

export type Blog = BlogInfo & {
  content: string;
};

export const getBlogInfos = ({ limit, offset }: { limit?: number, offset?: number }) =>
  client.get<MicroCMSListResponse<BlogInfo>>({
    endpoint: "blogs",
    queries: { limit, offset, fields: blogInfoFieldNames }
  });

export const getAllBlogInfos = async () =>
  await client.getAllContents<BlogInfo>({
    endpoint: "blogs",
    queries: { fields: blogInfoFieldNames }
  });

export const getAllBlogIds = async () =>
  await client.getAllContentIds({ endpoint: "blogs" });

export const getBlogDetail = async (contentId: string) =>
  await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId
  });

export const getBlogDetails = async ({ limit, offset }: { limit?: number, offset?: number }) =>
  client.get<MicroCMSListResponse<Blog>>({
    endpoint: "blogs",
    queries: {
      limit, offset,
      fields: blogInfoFieldNames.concat(["content"])
    }
  });