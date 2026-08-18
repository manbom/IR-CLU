import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type FaqItem = { question: string; answer: string };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  faq: FaqItem[];
};

export type Post = PostMeta & {
  html: string;
};

function slugFromFilename(filename: string) {
  return filename.replace(/\.md$/, "");
}

function readingTimeFor(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 180));
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    return {
      slug: slugFromFilename(filename),
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      readingTime: readingTimeFor(content),
      faq: (data.faq as FaqItem[]) ?? [],
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelatedPosts(post: PostMeta, count = 3): PostMeta[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);

  const scored = others
    .map((other) => ({
      post: other,
      sharedTags: other.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.sharedTags - a.sharedTags || (a.post.date < b.post.date ? 1 : -1));

  return scored.slice(0, count).map((s) => s.post);
}

export function getPostBySlug(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: readingTimeFor(content),
    faq: (data.faq as FaqItem[]) ?? [],
    html: marked.parse(content, { async: false }) as string,
  };
}
