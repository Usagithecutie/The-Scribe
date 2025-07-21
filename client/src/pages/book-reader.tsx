import { EnhancedBookReader } from "@/components/book/enhanced-book-reader";
import { AppLayout } from "@/components/layout/app-layout";

export default function BookReader() {
  return (
    <AppLayout>
      <div className="h-full">
        <EnhancedBookReader />
      </div>
    </AppLayout>
  );
}