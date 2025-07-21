import { EnhancedBookReader } from "@/components/book/enhanced-book-reader";

export default function BookReader() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 light:from-slate-50 light:via-purple-50/50 light:to-slate-100">
      <EnhancedBookReader />
    </div>
  );
}