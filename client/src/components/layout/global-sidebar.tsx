import { useState } from "react";
import { BookOpen, Menu, X, Home, PenTool } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GlobalSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function GlobalSidebar({ isOpen, onToggle }: GlobalSidebarProps) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/sanctuary", label: "Document Sanctuary", icon: PenTool },
    { href: "/book", label: "You Are A Poem And The World Is Reading You", icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 md:hidden bg-black/20 backdrop-blur-sm border border-white/10 rounded-full"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-64 z-40 transform transition-transform duration-300 ease-in-out",
          "bg-black/40 backdrop-blur-xl border-r border-white/10",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <span className="text-2xl">🪶</span>
            <span className="text-xl font-semibold text-white">Writing Sanctuary</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href || (item.href === "/book" && location.startsWith("/book"));
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-white/70 hover:text-white hover:bg-white/10",
                      isActive && "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                    )}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}