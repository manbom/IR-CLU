import fs from "fs";
import path from "path";

export type ProductType = "app" | "bot";

export type Product = {
  slug: string;
  type: ProductType;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  price: number;
  billing: "monthly" | "one-time";
  active: boolean;
};

const PRODUCTS_FILE = path.join(process.cwd(), "content/products/products.json");

// Set this once the sales bot exists — see automation/n8n-store-bot-workflow.json
export const STORE_BOT_USERNAME = "IRCLUStoreBot";

export function getAllProducts(): Product[] {
  const raw = fs.readFileSync(PRODUCTS_FILE, "utf8");
  const products = JSON.parse(raw) as Product[];
  return products.filter((p) => p.active);
}

export function formatToman(amount: number) {
  return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
}
