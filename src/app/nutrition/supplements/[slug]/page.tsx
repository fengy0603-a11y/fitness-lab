import { notFound } from "next/navigation";
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
