import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const modules = [
  { href: "/anatomy", emoji: "🦴", title: "3D 肌肉解剖", desc: "交互式人体肌肉图谱，可视化每一块肌肉。点击了解名称、功能、关联锻炼动作。", features: ["21块核心肌肉", "层级切换", "中英拉三语命名", "关联动作推荐"], color: "from-blue-500/10 to-cyan-500/10" },
  { href: "/nutrition", emoji: "💊", title: "营养知识引擎", desc: "以营养素为枢纽，覆盖补剂、食材、缺乏/过量危害。", features: ["10种核心补剂", "20种营养素", "21种食材", "多吃/少吃科学建议"], color: "from-green-500/10 to-emerald-500/10" },
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
            <Card className={`group h-full hover:shadow-md transition-all bg-gradient-to-br ${mod.color}`}>
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
