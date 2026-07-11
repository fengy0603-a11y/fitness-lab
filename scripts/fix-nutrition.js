const fs = require("fs");
fs.writeFileSync("src/app/nutrition/page.tsx", `import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { nutrients } from "@/content/nutrients";
import { supplements } from "@/content/supplements";
import { SUPPLEMENT_CATEGORY_LABELS, FOOD_STANCE_LABELS } from "@/lib/types";
import { getFoodsByStance } from "@/content/content-index";
import { Badge } from "@/components/ui/badge";

const scenarios = [
  { href: "/nutrition?goal=muscle_gain", emoji: "💪", label: "增肌怎么吃" },
  { href: "/nutrition?goal=fat_loss", emoji: "🔥", label: "减脂怎么吃" },
  { href: "/nutrition?goal=strength", emoji: "🏋️", label: "提升力量吃什么" },
  { href: "/nutrition?goal=endurance", emoji: "🏃", label: "提升耐力吃什么" },
];

export default function NutritionHub() {
  const eatMoreFoods = getFoodsByStance("eat_more").slice(0, 8);
  return (
    <div className="space-y-8">
      <div><h1 className="text-3xl font-bold">💊 营养知识引擎</h1><p className="text-muted-foreground mt-2">以营养素为枢纽，覆盖补剂、食材、缺乏/过量危害</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{scenarios.map(s=>(<Link key={s.href} href={s.href} className="rounded-lg border p-4 hover:bg-accent transition-colors text-center"><div className="text-2xl">{s.emoji}</div><div className="text-sm font-medium mt-1">{s.label}</div></Link>))}</div>
      <Card><CardHeader><CardTitle>🧬 核心营养素</CardTitle></CardHeader><CardContent><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{nutrients.map(n=>(<Link key={n.id} href={"/nutrition/nutrients/"+n.id}><div className="rounded-md border px-3 py-2 text-sm hover:bg-accent transition-colors"><div className="font-medium">{n.nameZh}</div><div className="text-xs text-muted-foreground">{n.nameEn}</div></div></Link>))}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>💊 补剂百科全书</CardTitle></CardHeader><CardContent><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{supplements.map(s=>(<Link key={s.id} href={"/nutrition/supplements/"+s.id}><div className="rounded-md border px-3 py-2 text-sm hover:bg-accent transition-colors"><div className="font-medium">{s.nameZh}</div><div className="flex items-center gap-1 mt-1"><Badge className="text-xs h-5 px-1.5">{s.evidenceRating}级</Badge><span className="text-xs text-muted-foreground">{SUPPLEMENT_CATEGORY_LABELS[s.category]}</span></div></div></Link>))}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>✅ 推荐多吃的食材</CardTitle></CardHeader><CardContent><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{eatMoreFoods.map(f=>(<Link key={f.id} href={"/nutrition/foods/"+f.id}><div className="rounded-md border px-3 py-2 text-sm hover:bg-accent transition-colors"><div className="font-medium">{FOOD_STANCE_LABELS[f.stance].emoji} {f.nameZh}</div><div className="text-xs text-muted-foreground mt-0.5">{f.nutritionPer100g.calories}kcal · 蛋白{f.nutritionPer100g.protein}g/100g</div></div></Link>))}</div></CardContent></Card>
    </div>
  );
}
`);
console.log("nutrition hub fixed");
