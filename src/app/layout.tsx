import Link from "next/link";
;
import { Search, Dumbbell, Pill } from "lucide-react";
import { GlobalSearch } from "@/components/layout/global-search";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-14 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Dumbbell className="h-5 w-5" />
              <span>Fitness Lab</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/anatomy" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <span>🦴</span> 3D 肌肉解剖
              </Link>
              <Link href="/nutrition" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <span>💊</span> 营养知识
              </Link>
            </nav>
            <div className="w-64">
              <GlobalSearch />
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          <p>本站内容仅供参考，不构成医疗建议。使用补剂前请咨询医生。</p>
          <p className="mt-1">Fitness Lab © {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}


