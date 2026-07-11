"use client";

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
              className={`text-left px-3 py-2 rounded-md border text-sm transition-colors ${selectedMuscle?.id === m.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-accent"}`}>
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
