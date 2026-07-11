import { notFound } from "next/navigation";
import { getFoodById, getNutrientById } from "@/content/content-index";
import { foods } from "@/content/foods";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FOOD_STANCE_LABELS, FOOD_CATEGORY_LABELS, TRAINING_GOAL_LABELS } from "@/lib/types";
import Link from "next/link";

export function generateStaticParams() { return foods.map(f => ({ slug: f.id })); }

export default async function FoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const food = getFoodById(slug);
  if (!food) notFound();
  const stance = FOOD_STANCE_LABELS[food.stance];
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div><p className="text-sm text-muted-foreground">🥩 {FOOD_CATEGORY_LABELS[food.category]}</p>
        <div className="flex items-center gap-2"><h1 className="text-3xl font-bold">{food.nameZh}</h1><Badge variant={food.stance==="eat_more"?"success":food.stance==="eat_less"?"danger":"secondary"} className="text-sm">{stance.emoji} {stance.label}</Badge></div>
        <p className="text-muted-foreground mt-1">{food.stanceReason}</p>
      </div>
      <Card><CardHeader><CardTitle>📊 营养成分（每100g）</CardTitle></CardHeader><CardContent><div className="grid grid-cols-4 gap-4 text-center">
        <div className="rounded-lg bg-muted p-3"><div className="text-2xl font-bold">{food.nutritionPer100g.calories}</div><div className="text-xs text-muted-foreground">热量(kcal)</div></div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-3"><div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{food.nutritionPer100g.protein}g</div><div className="text-xs text-muted-foreground">蛋白质</div></div>
        <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 p-3"><div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{food.nutritionPer100g.fat}g</div><div className="text-xs text-muted-foreground">脂肪</div></div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950 p-3"><div className="text-2xl font-bold text-green-700 dark:text-green-300">{food.nutritionPer100g.carbs}g</div><div className="text-xs text-muted-foreground">碳水</div></div>
      </div>{food.nutritionPer100g.fiber&&<div className="mt-3 text-sm text-muted-foreground">膳食纤维：{food.nutritionPer100g.fiber}g</div>}</CardContent></Card>
      <div className="grid md:grid-cols-2 gap-6">
        {food.eatMoreFor&&<Card className="border-l-4 border-l-green-400"><CardHeader><CardTitle className="text-green-600">✅ 为什么推荐多吃</CardTitle></CardHeader><CardContent className="text-sm space-y-2"><p>{food.eatMoreFor.reason}</p><div><span className="font-medium">适合人群：</span>{food.eatMoreFor.groups.join("、")}</div>{food.eatMoreFor.goals.length>0&&<div className="flex gap-1"><span className="font-medium">训练目标：</span>{food.eatMoreFor.goals.map(g=><Badge key={g} variant="secondary" className="text-xs">{TRAINING_GOAL_LABELS[g]}</Badge>)}</div>}</CardContent></Card>}
        {food.eatLessFor&&food.eatLessFor.groups.length>0&&<Card className="border-l-4 border-l-orange-400"><CardHeader><CardTitle className="text-orange-600">⚠️ 提醒少吃</CardTitle></CardHeader><CardContent className="text-sm space-y-2"><div><span className="font-medium">注意人群：</span>{food.eatLessFor.groups.join("、")}</div>{food.eatLessFor.risks.map((r,i)=>(<div key={i} className="flex gap-2 text-xs bg-muted rounded p-2"><span className="font-medium text-orange-600">[{r.severity}]</span><span>{r.risk} - {r.population}</span></div>))}</CardContent></Card>}
      </div>
      <Card><CardHeader><CardTitle>👨‍🍳 烹饪建议</CardTitle></CardHeader><CardContent><p className="text-sm">{food.cookingTips}</p></CardContent></Card>
      {food.nutrientIds.length>0&&<Card><CardHeader><CardTitle>🧬 富含营养素</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{food.nutrientIds.map(nid=>{const n=getNutrientById(nid);return n&&(<Link key={nid} href={"/nutrition/nutrients/"+n.id}><Badge className="cursor-pointer hover:bg-primary/80">{n.nameZh}</Badge></Link>);})}</div></CardContent></Card>}
    </div>
  );
}
