import { useState } from "react";
import { GlobalSidebar } from "./global-sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function AppLayout({ children, showSidebar = true }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative">
      {/* Cosmic background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15),transparent),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.15),transparent),radial-gradient(circle_at_40%_40%,rgba(120,200,255,0.1),transparent)]"></div>
      </div>

      {showSidebar && (
        <GlobalSidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      {/* Main content area */}
      <div className={`flex-1 relative z-10 ${showSidebar ? 'md:ml-64' : ''}`}>
        {children}
      </div>
    </div>
  );
}