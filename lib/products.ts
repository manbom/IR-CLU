import fs from "fs";
import path from "path";
import type { Locale } from "./locale";

export type ProductType = "app" | "bot";

export type Product = {
  slug: string;
  type: ProductType;
  title: string;
  description: string;
  highlights: string[];
  // English fields are optional — the source Google Sheet doesn't have them yet
  // (see automation/n8n-products-sync-workflow.json). Falls back to the Persian
  // copy below rather than showing nothing.
  title_en?: string;
  description_en?: string;
  highlights_en?: string[];
  image: string;
  price: number;
  billing: "monthly" | "one-time";
  active: boolean;
};

const PRODUCTS_FILE = path.join(process.cwd(), "content/products/products.json");

// Set this once the sales bot exists — see automation/n8n-store-bot-workflow.json
export const STORE_BOT_USERNAME = "irclubotbot";

export function getAllProducts(): Product[] {
  const raw = fs.readFileSync(PRODUCTS_FILE, "utf8");
  const products = JSON.parse(raw) as Product[];
  return products.filter((p) => p.active);
}

export function getLocalizedProduct(product: Product, locale: Locale) {
  if (locale === "en") {
    return {
      title: product.title_en ?? product.title,
      description: product.description_en ?? product.description,
      highlights: product.highlights_en ?? product.highlights,
    };
  }
  return { title: product.title, description: product.description, highlights: product.highlights };
}

export function formatToman(amount: number, locale: Locale = "fa") {
  if (locale === "en") {
    return `${new Intl.NumberFormat("en-US").format(amount)} Toman`;
  }
  return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
}
