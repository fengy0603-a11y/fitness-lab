const fs=require("fs");
fs.writeFileSync("src/app/nutrition/nutrients/[slug]/page.tsx", `import { notFound } from "next/navigation";
import { getNutrientById, getSupplementsByNutrient, getFoodsByNutrient, getSupplementById } from "@/content/content-index";
import { nutrients } from "@/content/nutrients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRAINING_GOAL_LABELS, FOOD_STANCE_LABELS } from "@/lib/types";
import Link from "next/link";

export function generateStaticParams() { return nutrients.map(n => ({ slug: n.id })); }

export default async function NutrientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nutrient = getNutrientById(slug);
  if (!nutrient) notFound();
  const supps = getSupplementsByNutrient(slug);
  const foodList = getFoodsByNutrient(slug);
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div><p className="text-sm text-muted-foreground">🧬 营养素</p><h1 className="text-3xl font-bold">{nutrient.nameZh}</h1><p className="text-muted-foreground">{nutrient.nameEn}</p></div>
      <Card><CardHeader><CardTitle>📊 推荐摄入量</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><div><span className="font-medium">普通人：</span>{nutrient.rda.general}</div>{nutrient.rda.athlete&&<div><span className="font-medium">运动人群：</span>{nutrient.rda.athlete}</div>}{nutrient.rda.bodybuilding&&<div><span className="font-medium">健身人群：</span>{nutrient.rda.bodybuilding}</div>}<div className="text-xs text-muted-foreground">⚠️ 安全上限：{nutrient.upperLimit}</div></CardContent></Card>
      {supps.length>0&&<Card><CardHeader><CardTitle>💊 补剂来源</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{supps.map(s=>{const sup=getSupplementById(s.id);if(!sup)return null;return(<Link key={s.id} href={"/nutrition/supplements/"+s.id}><Badge className="cursor-pointer hover:bg-primary/80">{sup.nameZh}</Badge></Link>);})}</div></CardContent></Card>}
      {foodList.length>0&&<Card><CardHeader><CardTitle>🥩 食材来源</CardTitle></CardHeader><CardContent><div className="space-y-2">{foodList.map(f=>(<Link key={f.id} href={"/nutrition/foods/"+f.id} className="flex items-center justify-between rounded-md border px-3 py-2 hover:bg-accent transition-colors"><div className="flex items-center gap-2"><span>{FOOD_STANCE_LABELS[f.stance].emoji}</span><span className="font-medium text-sm">{f.nameZh}</span></div><div className="text-xs text-muted-foreground">{f.nutritionPer100g.calories}kcal · 蛋白{f.nutritionPer100g.protein}g</div></Link>))}</div></CardContent></Card>}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-red-400"><CardHeader><CardTitle className="text-red-600">🔴 缺乏危害（吃少了）</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div><span className="font-medium">短期：</span>{nutrient.deficiency.shortTerm.join("、")}</div><div><span className="font-medium">长期：</span>{nutrient.deficiency.longTerm.join("、")}</div><div><span className="font-medium">高危人群：</span>{nutrient.deficiency.atRiskGroups.join("、")}</div>{nutrient.deficiency.earlySigns&&<div><span className="font-medium">早期信号：</span>{nutrient.deficiency.earlySigns.join("、")}</div>}</CardContent></Card>
        <Card className="border-l-4 border-l-orange-400"><CardHeader><CardTitle className="text-orange-600">⚠️ 过量危害（吃多了）</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">{nutrient.excess.shortTerm.length>0&&<div><span className="font-medium">短期：</span>{nutrient.excess.shortTerm.join("、")}</div>}{nutrient.excess.longTerm.length>0&&<div><span className="font-medium">长期：</span>{nutrient.excess.longTerm.join("、")}</div>}<div><span className="font-medium">高危人群：</span>{nutrient.excess.atRiskGroups.join("、")}</div></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>🎯 关联训练目标</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{nutrient.relatedGoals.map(g=><Badge key={g}>{TRAINING_GOAL_LABELS[g]}</Badge>)}</div></CardContent></Card>
    </div>
  );
}
`);
console.log("nutrient page regenerated");
