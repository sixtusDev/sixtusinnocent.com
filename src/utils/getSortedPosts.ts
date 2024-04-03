import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog" | "notes">[]) => {
  return posts
    ? posts
        .filter(postFilter)
        .sort(
          (a: any, b: any) =>
            Math.floor(
              new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() /
                1000
            ) -
            Math.floor(
              new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() /
                1000
            )
        )
    : [];
};

export default getSortedPosts;
