const fs=require("fs");

// Nutrition hub
fs.writeFileSync("src/app/nutrition/page.tsx", `import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { nutrients } from "@/content/nutrients";
import { supplements } from "@/content/supplements";
import { SUPPLEMENT_CATEGORY_LABELS, FOOD_STANCE_LABELS } from "@/lib/types";
import { getFoodsByStance } from "@/content/content-index";
import { Badge } from "@/components/ui/badge";

const scenarios = [
  { href: "/nutrition?goal=muscle_gain", emoji: "\u{1F4AA}", label: "\u589E\u808C\u600E\u4E48\u5403" },
  { href: "/nutrition?goal=fat_loss", emoji: "\u{1F525}", label: "\u51CF\u8102\u600E\u4E48\u5403" },
  { href: "/nutrition?goal=strength", emoji: "\u{1F3CB}\uFE0F", label: "\u63D0\u5347\u529B\u91CF\u5403\u4EC0\u4E48" },
  { href: "/nutrition?goal=endurance", emoji: "\u{1F3C3}", label: "\u63D0\u5347\u8010\u529B\u5403\u4EC0\u4E48" },
];

export default function NutritionHub() {
  const eatMoreFoods = getFoodsByStance("eat_more").slice(0, 8);
  return (
    <div className="space-y-8">
      <div><h1 className="text-3xl font-bold">\u{1F48A} \u8425\u517B\u77E5\u8BC6\u5F15\u64CE</h1><p className="text-muted-foreground mt-2">\u4EE5\u8425\u517B\u7D20\u4E3A\u67A2\u7EBD\uFF0C\u8986\u76D6\u8865\u5242\u3001\u98DF\u6750\u3001\u7F3A\u4E4F/\u8FC7\u91CF\u5371\u5BB3</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{scenarios.map(s=>(<Link key={s.href} href={s.href} className="rounded-lg border p-4 hover:bg-accent transition-colors text-center"><div className="text-2xl">{s.emoji}</div><div className="text-sm font-medium mt-1">{s.label}</div></Link>))}</div>
      <Card><CardHeader><CardTitle>\u{1F9EC} \u6838\u5FC3\u8425\u517B\u7D20</CardTitle></CardHeader><CardContent><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{nutrients.map(n=>(<Link key={n.id} href={"/nutrition/nutrients/"+n.id}><div className="rounded-md border px-3 py-2 text-sm hover:bg-accent transition-colors"><div className="font-medium">{n.nameZh}</div><div className="text-xs text-muted-foreground">{n.nameEn}</div></div></Link>))}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>\u{1F48A} \u8865\u5242\u767E\u79D1\u5168\u4E66</CardTitle></CardHeader><CardContent><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{supplements.map(s=>(<Link key={s.id} href={"/nutrition/supplements/"+s.id}><div className="rounded-md border px-3 py-2 text-sm hover:bg-accent transition-colors"><div className="font-medium">{s.nameZh}</div><div className="flex items-center gap-1 mt-1"><Badge className="text-xs h-5 px-1.5">{s.evidenceRating}\u7EA7</Badge><span className="text-xs text-muted-foreground">{SUPPLEMENT_CATEGORY_LABELS[s.category]}</span></div></div></Link>))}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>\u2705 \u63A8\u8350\u591A\u5403\u7684\u98DF\u6750</CardTitle></CardHeader><CardContent><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{eatMoreFoods.map(f=>(<Link key={f.id} href={"/nutrition/foods/"+f.id}><div className="rounded-md border px-3 py-2 text-sm hover:bg-accent transition-colors"><div className="font-medium">{FOOD_STANCE_LABELS[f.stance].emoji} {f.nameZh}</div><div className="text-xs text-muted-foreground mt-0.5">{f.nutritionPer100g.calories}kcal \u00B7 \u86CB\u767D{f.nutritionPer100g.protein}g/100g</div></div></Link>))}</div></CardContent></Card>
    </div>
  );
}
`, 'utf8');
console.log("nutrition hub done");

// Homepage
fs.writeFileSync("src/app/page.tsx", `import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const modules = [
  { href: "/anatomy", emoji: "\u{1F9B4}", title: "3D \u808C\u8089\u89E3\u5256", desc: "\u4EA4\u4E92\u5F0F\u4EBA\u4F53\u808C\u8089\u56FE\u8C31\uFF0C\u53EF\u89C6\u5316\u6BCF\u4E00\u5757\u808C\u8089\u3002\u70B9\u51FB\u4E86\u89E3\u540D\u79F0\u3001\u529F\u80FD\u3001\u5173\u8054\u953B\u70BC\u52A8\u4F5C\u3002", features: ["21\u5757\u6838\u5FC3\u808C\u8089", "\u5C42\u7EA7\u5207\u6362", "\u4E2D\u82F1\u62C9\u4E09\u8BED\u547D\u540D", "\u5173\u8054\u52A8\u4F5C\u63A8\u8350"], color: "from-blue-500/10 to-cyan-500/10" },
  { href: "/nutrition", emoji: "\u{1F48A}", title: "\u8425\u517B\u77E5\u8BC6\u5F15\u64CE", desc: "\u4EE5\u8425\u517B\u7D20\u4E3A\u67A2\u7EBD\uFF0C\u8986\u76D6\u8865\u5242\u3001\u98DF\u6750\u3001\u7F3A\u4E4F/\u8FC7\u91CF\u5371\u5BB3\u3002", features: ["10\u79CD\u6838\u5FC3\u8865\u5242", "20\u79CD\u8425\u517B\u7D20", "21\u79CD\u98DF\u6750", "\u591A\u5403/\u5C11\u5403\u79D1\u5B66\u5EFA\u8BAE"], color: "from-green-500/10 to-emerald-500/10" },
];

const scenarios = [
  { href: "/nutrition?goal=muscle_gain", emoji: "\u{1F4AA}", label: "\u589E\u808C\u600E\u4E48\u5403" },
  { href: "/nutrition?goal=fat_loss", emoji: "\u{1F525}", label: "\u51CF\u8102\u600E\u4E48\u5403" },
  { href: "/nutrition/nutrients/protein", emoji: "\u{1F969}", label: "\u86CB\u767D\u8D28\u53BB\u54EA\u627E" },
  { href: "/nutrition/nutrients/creatine", emoji: "\u26A1", label: "\u808C\u9178\u662F\u4EC0\u4E48" },
  { href: "/anatomy?group=chest", emoji: "\u{1F3CB}\uFE0F", label: "\u80F8\u808C\u600E\u4E48\u7EC3" },
  { href: "/anatomy?group=back", emoji: "\u{1F519}", label: "\u80CC\u808C\u600E\u4E48\u7EC3" },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center py-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">\u7528\u79D1\u5B66\u7684\u773C\u775B\u770B\u5F85\u8EAB\u4F53</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">3D \u4EA4\u4E92\u5F0F\u808C\u8089\u89E3\u5256 + \u8425\u517B\u77E5\u8BC6\u5F15\u64CE\u3002\u5065\u8EAB\u4E0D\u9760\u731C\uFF0C\u7528\u6570\u636E\u8BF4\u8BDD\u3002</p>
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
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">\u8FDB\u5165\u6A21\u5757 <ArrowRight className="h-4 w-4" /></div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-4">\u{1F50D} \u5927\u5BB6\u90FD\u5728\u95EE</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {scenarios.map((s) => (<Link key={s.href} href={s.href} className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm hover:bg-accent transition-colors"><span>{s.emoji}</span><span>{s.label}</span></Link>))}
        </div>
      </section>
    </div>
  );
}
`, 'utf8');
console.log("homepage done");
