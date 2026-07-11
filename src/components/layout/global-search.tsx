"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Fuse from "fuse.js";
import { getAllSearchableItems } from "@/content/content-index";
import { SearchableItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const fuse = new Fuse(getAllSearchableItems(), {
  keys: ["nameZh", "nameEn", "aliases"],
  threshold: 0.3,
});

const typeLabels: Record<string, { emoji: string; label: string }> = {
  muscle: { emoji: "🦴", label: "肌肉" },
  exercise: { emoji: "🏃", label: "动作" },
  nutrient: { emoji: "🧬", label: "营养素" },
  supplement: { emoji: "💊", label: "补剂" },
  food: { emoji: "🥩", label: "食材" },
};

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 0) {
      setResults(fuse.search(query).slice(0, 8).map(r => r.item));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索肌肉、动作、补剂..."
          className="pl-8 h-9 text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setOpen(true); }}
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full rounded-md border bg-popover shadow-lg z-50 max-h-80 overflow-auto">
          {results.map((item, i) => (
            <Link
              key={item.id + i}
              href={item.href}
              onClick={() => { setOpen(false); setQuery(""); }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors",
                i === 0 && "rounded-t-md",
                i === results.length - 1 && "rounded-b-md"
              )}
            >
              <span>{typeLabels[item.type]?.emoji}</span>
              <span className="font-medium">{item.nameZh}</span>
              <span className="text-muted-foreground text-xs">{typeLabels[item.type]?.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
