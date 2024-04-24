import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog" | "notes">[]) => {
  if (!posts) return [];

  const isBookCollection = posts[0].collection;
  if (isBookCollection) return posts;

  return posts
    .filter(postFilter)
    .sort(
      (a: any, b: any) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedPosts;
