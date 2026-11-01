import { writeFileSync } from "fs";
import { createRequire } from "module";

// Compile-free approach: duplicate by importing via tsx isn't available,
// so we spawn a tiny transpile using node's ability to read rewritten JS.
// Prefer generating from a JSON dump produced below.

const require = createRequire(import.meta.url);

async function main() {
  // Dynamic import of compiled data isn't available; rewrite menu.ts to temp ESM.
  const { readFileSync } = await import("fs");
  let src = readFileSync("./src/data/menu.ts", "utf8");

  src = src
    .replace(/import type[\s\S]*?;\n/, "")
    .replace(/: Category\[\]/g, "")
    .replace(/: MenuItem\[\]/g, "")
    .replace(
      /function item\([\s\S]*?\): MenuItem \{[\s\S]*?return \{ available: true, \.\.\.partial \};\n\}/,
      "function item(partial) { return { available: true, ...partial }; }"
    )
    .replace(/export /g, "");

  const tmp = "./scripts/_menu.temp.mjs";
  writeFileSync(tmp, src + "\nexport { categories, menuItems };\n");

  const mod = await import(`file://${process.cwd().replace(/\\/g, "/")}/scripts/_menu.temp.mjs`);
  const cats = mod.categories;
  const items = mod.menuItems;

  const esc = (value) => String(value).replace(/'/g, "''");

  let sql = "-- Auto-generated seed from src/data/menu.ts\n";
  sql +=
    "truncate table order_items, orders, contact_messages, menu_items, categories restart identity cascade;\n\n";
  sql += "insert into categories (id, name, slug, sort_order) values\n";
  sql +=
    cats
      .map(
        (c) =>
          `  ('${esc(c.id)}', '${esc(c.name)}', '${esc(c.slug)}', ${c.sort_order})`
      )
      .join(",\n") + ";\n\n";

  sql +=
    "insert into menu_items (id, name, description, category_id, category_slug, price_full, price_half, price_small, price_medium, price_large, image, featured, bestseller, available) values\n";
  sql +=
    items
      .map((i) => {
        const half = i.price_half == null ? "null" : i.price_half;
        const small = i.price_small == null ? "null" : i.price_small;
        const medium = i.price_medium == null ? "null" : i.price_medium;
        const large = i.price_large == null ? "null" : i.price_large;
        return `  ('${esc(i.id)}', '${esc(i.name)}', '${esc(i.description)}', '${esc(
          i.category_id
        )}', '${esc(i.category_slug)}', ${i.price_full}, ${half}, ${small}, ${medium}, ${large}, '${esc(
          i.image
        )}', ${Boolean(i.featured)}, ${Boolean(i.bestseller)}, ${
          i.available !== false
        })`;
      })
      .join(",\n") + ";\n";

  writeFileSync("./supabase/seed.sql", sql);
  writeFileSync(tmp, ""); // clear
  const { unlinkSync } = await import("fs");
  try {
    unlinkSync(tmp);
  } catch {}
  console.log(`Wrote seed with ${cats.length} categories and ${items.length} items`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
