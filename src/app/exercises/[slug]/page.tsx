import { notFound } from "next/navigation";
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
