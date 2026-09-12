import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type HeadlineMetric = { value: string; label: string; note?: string };
export type Feature = { title: string; detail: string };
export type Challenge = { title: string; body: string; evidence?: string };
export type StackItem = { name: string; role: string };
export type TechnicalFact = { label: string; value: string; detail?: string };
export type Demo = { available: boolean; kind?: string; note?: string };

export type CaseStudyMeta = {
  slug: string;
  status: string;
  featured: boolean;
  order: number;
  title: string;
  titleEn?: string;
  tagline: string;
  client: string;
  industry?: string;
  role: string;
  duration?: string;
  year?: string;
  headlineMetrics: HeadlineMetric[];
  problem: string;
  solution: string;
  outcome: string;
  features: Feature[];
  challenges: Challenge[];
  decisions: string[];
  stack: StackItem[];
  tags: string[];
  technicalFacts: TechnicalFact[];
  demo?: Demo;
};

export type CaseStudy = CaseStudyMeta & { html: string };

const DIR = path.join(process.cwd(), "content/portfolio");

// content/portfolio/ may be empty — that's a normal state, not an error.
function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toMeta(data: any, slug: string): CaseStudyMeta {
  return {
    slug,
    status: data.status ?? "delivered",
    featured: Boolean(data.featured),
    order: typeof data.order === "number" ? data.order : 99,
    title: data.title,
    titleEn: data.title_en,
    tagline: data.tagline,
    client: data.client,
    industry: data.industry,
    role: data.role,
    duration: data.duration,
    year: data.year ? String(data.year) : undefined,
    headlineMetrics: data.headline_metrics ?? [],
    problem: data.problem,
    solution: data.solution,
    outcome: data.outcome,
    features: data.features ?? [],
    challenges: data.challenges ?? [],
    decisions: data.decisions ?? [],
    stack: data.stack ?? [],
    tags: data.tags ?? [],
    technicalFacts: data.technical_facts ?? [],
    demo: data.demo,
  };
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  const files = listMarkdownFiles(DIR);
  const items = files.map((filename) => {
    const raw = fs.readFileSync(path.join(DIR, filename), "utf8");
    const { data } = matter(raw);
    return toMeta(data, filename.replace(/\.md$/, ""));
  });
  return items.sort((a, b) => a.order - b.order);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    ...toMeta(data, slug),
    html: marked.parse(content, { async: false }) as string,
  };
}
