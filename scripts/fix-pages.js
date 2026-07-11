const fs = require("fs");

// Fix homepage - broken className with template literal
fs.writeFileSync("src/app/page.tsx", `import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const modules = [
  { href: "/anatomy", emoji: "🦴", title: "3D 肌肉解剖", desc: "交互式人体肌肉图谱，可视化每一块肌肉。点击了解名称、功能、关联锻炼动作。", features: ["21块核心肌肉", "层级切换(浅层/深层/骨骼)", "中英拉三语命名", "关联动作推荐"], color: "from-blue-500/10 to-cyan-500/10" },
  { href: "/nutrition", emoji: "💊", title: "营养知识引擎", desc: "以营养素为枢纽，覆盖补剂、食材、缺乏/过量危害。让每一口都吃得明白。", features: ["10种核心补剂", "20种营养素", "21种食材", "多吃/少吃科学建议"], color: "from-green-500/10 to-emerald-500/10" },
];

const scenarios = [
  { href: "/nutrition?goal=muscle_gain", emoji: "💪", label: "增肌怎么吃" },
  { href: "/nutrition?goal=fat_loss", emoji: "🔥", label: "减脂怎么吃" },
  { href: "/nutrition/nutrients/protein", emoji: "🥩", label: "蛋白质去哪找" },
  { href: "/nutrition/nutrients/creatine", emoji: "⚡", label: "肌酸是什么" },
  { href: "/anatomy?group=chest", emoji: "🏋️", label: "胸肌怎么练" },
  { href: "/anatomy?group=back", emoji: "🔙", label: "背肌怎么练" },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center py-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">用科学的眼睛看待身体</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">3D 交互式肌肉解剖 + 营养知识引擎。健身不靠猜，用数据说话。</p>
      </section>
      <section className="grid md:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <Link key={mod.href} href={mod.href}>
            <Card className={\`group h-full hover:shadow-md transition-all bg-gradient-to-br \${mod.color}\`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl"><span>{mod.emoji}</span> {mod.title}</CardTitle>
                <CardDescription className="text-base">{mod.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {mod.features.map((f) => (<li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary/40" />{f}</li>))}
                </ul>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">进入模块 <ArrowRight className="h-4 w-4" /></div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-4">🔍 大家都在问</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {scenarios.map((s) => (<Link key={s.href} href={s.href} className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm hover:bg-accent transition-colors"><span>{s.emoji}</span><span>{s.label}</span></Link>))}
        </div>
      </section>
    </div>
  );
}
`);
console.log("homepage fixed");

// Fix anatomy page
fs.writeFileSync("src/app/anatomy/page.tsx", `"use client";

import { useState, useMemo } from "react";
import { muscles } from "@/content/muscles";
import { getExercisesByMuscle } from "@/content/content-index";
import { Muscle, MUSCLE_GROUP_LABELS, MuscleGroup } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";

const fuse = new Fuse(muscles, { keys: ["nameZh", "nameEn", "aliases"], threshold: 0.3 });
const groups = Object.entries(MUSCLE_GROUP_LABELS);

export default function AnatomyPage() {
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle | null>(null);
  const [activeGroup, setActiveGroup] = useState<MuscleGroup | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = muscles;
    if (activeGroup) result = result.filter(m => m.group === activeGroup);
    if (search.trim()) result = fuse.search(search).map(r => r.item);
    return result;
  }, [activeGroup, search]);

  const exercises = selectedMuscle ? getExercisesByMuscle(selectedMuscle.id) : [];

  return (
    <div className="flex gap-6">
      <div className="hidden lg:flex w-1/2 h-[70vh] items-center justify-center rounded-xl border bg-muted/30">
        <div className="text-center text-muted-foreground p-8">
          <div className="text-6xl mb-4">🦴</div>
          <h3 className="text-lg font-semibold mb-2">3D 肌肉模型</h3>
          <p className="text-sm">交互式 3D 查看器即将上线</p>
          <p className="text-xs mt-1">支持旋转、缩放、点击肌肉查看详情</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索肌肉..." className="pl-8" value={search} onChange={e => { setSearch(e.target.value); setActiveGroup(null); }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={activeGroup === null ? "default" : "outline"} className="cursor-pointer" onClick={() => setActiveGroup(null)}>全部</Badge>
          {groups.map(([key, label]) => (
            <Badge key={key} variant={activeGroup === key ? "default" : "outline"} className="cursor-pointer" onClick={() => setActiveGroup(key as MuscleGroup)}>{label}</Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filtered.map(m => (
            <button key={m.id} onClick={() => setSelectedMuscle(m)}
              className={\`text-left px-3 py-2 rounded-md border text-sm transition-colors \${selectedMuscle?.id === m.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-accent"}\`}>
              <div className="font-medium truncate">{m.nameZh}</div>
              <div className="text-xs text-muted-foreground truncate">{m.nameEn}</div>
            </button>
          ))}
        </div>
        {selectedMuscle && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h2 className="text-xl font-bold">{selectedMuscle.nameZh}</h2>
                <p className="text-sm text-muted-foreground">{selectedMuscle.nameEn}</p>
                <p className="text-xs text-muted-foreground italic">{selectedMuscle.nameLa}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="font-medium">起点：</span>{selectedMuscle.origin}</div>
                <div><span className="font-medium">止点：</span>{selectedMuscle.insertion}</div>
              </div>
              <div><span className="font-medium text-sm">功能：</span>
                <div className="flex flex-wrap gap-1 mt-1">{selectedMuscle.function.map(f => <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>)}</div>
              </div>
              {exercises.length > 0 && (
                <div><h4 className="font-medium text-sm mb-2">🎯 推荐动作</h4>
                  <div className="flex flex-wrap gap-2">{exercises.map(e => (<Link key={e.id} href={"/exercises/" + e.id}><Badge variant="outline" className="cursor-pointer hover:bg-accent">{e.nameZh}</Badge></Link>))}</div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
`);
console.log("anatomy fixed");

// Fix exercise page
fs.writeFileSync("src/app/exercises/[slug]/page.tsx", `import { notFound } from "next/navigation";
import { getExerciseById, getMuscleById } from "@/content/content-index";
import { exercises } from "@/content/exercises";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_LABELS } from "@/lib/types";
import Link from "next/link";

export function generateStaticParams() { return exercises.map(e => ({ slug: e.id })); }

export default async function ExercisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exercise = getExerciseById(slug);
  if (!exercise) notFound();
  const targetMuscles = exercise.muscleIds.map(getMuscleById).filter(Boolean);
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div><h1 className="text-3xl font-bold">{exercise.nameZh}</h1><p className="text-muted-foreground">{exercise.nameEn}</p>
        <div className="flex gap-2 mt-2"><Badge>{DIFFICULTY_LABELS[exercise.difficulty]}</Badge><Badge variant="outline">{exercise.equipment}</Badge></div>
      </div>
      <div className="aspect-video rounded-xl bg-muted flex items-center justify-center"><span className="text-muted-foreground text-4xl">🏋️</span></div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle>动作要领</CardTitle></CardHeader><CardContent><ol className="list-decimal list-inside space-y-2 text-sm">{exercise.steps.map((s,i)=><li key={i}>{s}</li>)}</ol><p className="mt-4 text-sm text-muted-foreground border-t pt-3"><span className="font-medium text-foreground">💡 小贴士：</span>{exercise.tips}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>常见错误</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm">{exercise.commonMistakes.map((m,i)=><li key={i} className="flex gap-2"><span className="text-destructive">✗</span>{m}</li>)}</ul></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>🎯 目标肌肉</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{targetMuscles.map(m=>m&&(<Link key={m.id} href={"/anatomy?muscle="+m.id}><Badge className="cursor-pointer hover:bg-primary/80">{m.nameZh}</Badge></Link>))}</div></CardContent></Card>
    </div>
  );
}
`);
console.log("exercise fixed");

// Fix nutrient detail
fs.writeFileSync("src/app/nutrition/nutrients/[slug]/page.tsx", `import { notFound } from "next/navigation";
import { getNutrientById, getSupplementsByNutrient, getFoodsByNutrient, getFoodById, getSupplementById } from "@/content/content-index";
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
      {supps.length>0&&<Card><CardHeader><CardTitle>💊 补剂来源</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{supps.map(s=>{const sup=getSupplementById(s.id);return sup&&(<Link key={s.id} href={"/nutrition/supplements/"+s.id}><Badge className="cursor-pointer hover:bg-primary/80">{sup.nameZh}</Badge></Link>);})}</div></CardContent></Card>}
      {foodList.length>0&&<Card><CardHeader><CardTitle>🥩 食材来源</CardTitle></CardHeader><CardContent><div className="space-y-2">{foodList.map(fid=>{const f=getFoodById(fid);return f&&(<Link key={fid} href={"/nutrition/foods/"+f.id} className="flex items-center justify-between rounded-md border px-3 py-2 hover:bg-accent transition-colors"><div className="flex items-center gap-2"><span>{FOOD_STANCE_LABELS[f.stance].emoji}</span><span className="font-medium text-sm">{f.nameZh}</span></div><div className="text-xs text-muted-foreground">{f.nutritionPer100g.calories}kcal · 蛋白{f.nutritionPer100g.protein}g</div></Link>);})}</div></CardContent></Card>}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-red-400"><CardHeader><CardTitle className="text-red-600">🔴 缺乏危害（吃少了）</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div><span className="font-medium">短期：</span>{nutrient.deficiency.shortTerm.join("、")}</div><div><span className="font-medium">长期：</span>{nutrient.deficiency.longTerm.join("、")}</div><div><span className="font-medium">高危人群：</span>{nutrient.deficiency.atRiskGroups.join("、")}</div>{nutrient.deficiency.earlySigns&&<div><span className="font-medium">早期信号：</span>{nutrient.deficiency.earlySigns.join("、")}</div>}</CardContent></Card>
        <Card className="border-l-4 border-l-orange-400"><CardHeader><CardTitle className="text-orange-600">⚠️ 过量危害（吃多了）</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">{nutrient.excess.shortTerm.length>0&&<div><span className="font-medium">短期：</span>{nutrient.excess.shortTerm.join("、")}</div>}{nutrient.excess.longTerm.length>0&&<div><span className="font-medium">长期：</span>{nutrient.excess.longTerm.join("、")}</div>}<div><span className="font-medium">高危人群：</span>{nutrient.excess.atRiskGroups.join("、")}</div></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>🎯 关联训练目标</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{nutrient.relatedGoals.map(g=><Badge key={g}>{TRAINING_GOAL_LABELS[g]}</Badge>)}</div></CardContent></Card>
    </div>
  );
}
`);
console.log("nutrient fixed");

// Fix supplement detail
fs.writeFileSync("src/app/nutrition/supplements/[slug]/page.tsx", `import { notFound } from "next/navigation";
import { getSupplementById, getFoodById } from "@/content/content-index";
import { supplements } from "@/content/supplements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EVIDENCE_LABELS, SUPPLEMENT_CATEGORY_LABELS, TRAINING_GOAL_LABELS } from "@/lib/types";
import Link from "next/link";

export function generateStaticParams() { return supplements.map(s => ({ slug: s.id })); }

export default async function SupplementPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supp = getSupplementById(slug);
  if (!supp) notFound();
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div><p className="text-sm text-muted-foreground">💊 {SUPPLEMENT_CATEGORY_LABELS[supp.category]}</p><h1 className="text-3xl font-bold">{supp.nameZh}</h1><p className="text-muted-foreground">{supp.nameEn}</p>
        <div className="flex gap-2 mt-2"><Badge className={EVIDENCE_LABELS[supp.evidenceRating].color}>{EVIDENCE_LABELS[supp.evidenceRating].label}</Badge>{supp.relatedGoals.map(g=><Badge key={g} variant="secondary">{TRAINING_GOAL_LABELS[g]}</Badge>)}</div>
      </div>
      <Card><CardHeader><CardTitle>📝 概述</CardTitle></CardHeader><CardContent><p className="text-sm leading-relaxed">{supp.summary}</p></CardContent></Card>
      <Card><CardHeader><CardTitle>🔬 作用机制：{supp.mechanism.title}</CardTitle></CardHeader><CardContent><p className="text-sm leading-relaxed">{supp.mechanism.detail}</p></CardContent></Card>
      <Card><CardHeader><CardTitle>⭐ 效果与证据</CardTitle></CardHeader><CardContent><div className="space-y-2">{supp.effects.map((e,i)=>(<div key={i} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"><span>{e.effect}</span><Badge variant={e.level==="强"?"success":e.level==="中"?"secondary":"outline"}>{e.level}</Badge></div>))}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>📋 用法用量</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{supp.dosage.loading&&<div><span className="font-medium">冲击期：</span>{supp.dosage.loading}</div>}<div><span className="font-medium">维持期：</span>{supp.dosage.maintenance}</div>{supp.dosage.timing&&<div><span className="font-medium">服用时机：</span>{supp.dosage.timing}</div>}</CardContent></Card>
      <Card><CardHeader><CardTitle>⚠️ 安全性</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><div><span className="font-medium">常见副作用：</span>{supp.safety.sideEffects.join("、")||"一般良好"}</div><div><span className="font-medium">禁忌：</span>{supp.safety.contraindications.join("、")||"无已知禁忌"}</div><div><span className="font-medium">长期使用：</span>{supp.safety.longTerm}</div></CardContent></Card>
      {supp.foodSources.length>0&&<Card><CardHeader><CardTitle>🥩 天然食物来源</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{supp.foodSources.map(fid=>{const f=getFoodById(fid);return f&&(<Link key={fid} href={"/nutrition/foods/"+f.id}><Badge className="cursor-pointer hover:bg-primary/80">{f.nameZh}</Badge></Link>);})}</div></CardContent></Card>}
      {supp.references.length>0&&<Card><CardHeader><CardTitle>📚 参考文献</CardTitle></CardHeader><CardContent><ul className="text-xs text-muted-foreground space-y-1">{supp.references.map((r,i)=><li key={i}>{r}</li>)}</ul></CardContent></Card>}
      <p className="text-xs text-muted-foreground text-center">⚠️ 本站内容仅供参考，不构成医疗建议。使用补剂前请咨询医生。</p>
    </div>
  );
}
`);
console.log("supplement fixed");

// Fix food detail
fs.writeFileSync("src/app/nutrition/foods/[slug]/page.tsx", `import { notFound } from "next/navigation";
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
`);
console.log("food fixed");
