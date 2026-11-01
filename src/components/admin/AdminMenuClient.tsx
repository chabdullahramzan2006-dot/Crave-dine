"use client";

import { useMemo, useState } from "react";
import type { Category, MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function AdminMenuClient({
  items: initial,
  categories,
  configured,
}: {
  items: MenuItem[];
  categories: Category[];
  configured: boolean;
}) {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((item) => {
      const catOk = filter === "all" || item.category_slug === filter;
      const qOk =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [items, filter, query]);

  async function saveItem(item: MenuItem) {
    if (!configured) {
      setMessage("Supabase is not configured — changes are local preview only.");
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
      return;
    }

    setSaving(item.id);
    setMessage("");
    const res = await fetch("/api/menu", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        price_full: item.price_full,
        price_half: item.price_half,
        available: item.available,
        featured: item.featured,
        bestseller: item.bestseller,
        name: item.name,
        description: item.description,
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      setMessage(json.error || "Save failed");
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? (json.item as MenuItem) : i))
      );
      setMessage("Saved.");
    }
    setSaving(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search menu…"
          className="input-field max-w-md"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-field max-w-xs"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {message && (
        <p className="rounded-xl bg-cd-cream px-3 py-2 text-sm text-cd-ink">
          {message}
        </p>
      )}

      <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-black/5 bg-cd-cream/70 text-xs uppercase tracking-wide text-cd-muted">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Full</th>
              <th className="px-4 py-3">Half</th>
              <th className="px-4 py-3">Flags</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-black/5 align-top">
                <td className="px-4 py-3">
                  <p className="font-semibold text-cd-ink">{item.name}</p>
                  <p className="text-xs text-cd-muted">{item.category_slug}</p>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    className="w-24 rounded-lg border border-black/10 px-2 py-1"
                    value={item.price_full}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id
                            ? { ...i, price_full: Number(e.target.value) }
                            : i
                        )
                      )
                    }
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    className="w-24 rounded-lg border border-black/10 px-2 py-1"
                    value={item.price_half ?? ""}
                    placeholder="—"
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((i) =>
                          i.id === item.id
                            ? {
                                ...i,
                                price_half: e.target.value
                                  ? Number(e.target.value)
                                  : null,
                              }
                            : i
                        )
                      )
                    }
                  />
                </td>
                <td className="px-4 py-3">
                  <label className="mr-3 inline-flex items-center gap-1 text-xs">
                    <input
                      type="checkbox"
                      checked={item.available !== false}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((i) =>
                            i.id === item.id
                              ? { ...i, available: e.target.checked }
                              : i
                          )
                        )
                      }
                    />
                    Available
                  </label>
                  <label className="mr-3 inline-flex items-center gap-1 text-xs">
                    <input
                      type="checkbox"
                      checked={Boolean(item.featured)}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((i) =>
                            i.id === item.id
                              ? { ...i, featured: e.target.checked }
                              : i
                          )
                        )
                      }
                    />
                    Featured
                  </label>
                  <label className="inline-flex items-center gap-1 text-xs">
                    <input
                      type="checkbox"
                      checked={Boolean(item.bestseller)}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((i) =>
                            i.id === item.id
                              ? { ...i, bestseller: e.target.checked }
                              : i
                          )
                        )
                      }
                    />
                    Best
                  </label>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="rounded-full bg-cd-red px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                    disabled={saving === item.id}
                    onClick={() =>
                      saveItem(items.find((i) => i.id === item.id) || item)
                    }
                  >
                    {saving === item.id ? "Saving…" : "Save"}
                  </button>
                  <p className="mt-1 text-[10px] text-cd-muted">
                    {formatPrice(item.price_full)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
