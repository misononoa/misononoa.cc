import type { MicroCMSListContent, MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export type Blog = MicroCMSListContent & {
  title?: string;
  content: string;
};

export type BlogResponse = MicroCMSListResponse<Blog>;

export const getBlogs = async (queries: MicroCMSQueries) => {
  return await client.get<BlogResponse>({
    endpoint: "blogs",
    queries,
  });
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
};
