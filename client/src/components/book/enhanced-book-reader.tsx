import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  BookOpen, 
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Heart,
  Quote
} from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { bookSections } from "@shared/book-content";

interface EnhancedBookReaderProps {
  initialSectionId?: string;
  initialChapterId?: string;
}

export function EnhancedBookReader({ initialSectionId, initialChapterId }: EnhancedBookReaderProps) {
  const { theme } = useTheme();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(() => {
    if (initialSectionId) {
      return bookSections.findIndex((section: any) => section.id === initialSectionId);
    }
    return 0;
  });
  
  const [currentChapterIndex, setCurrentChapterIndex] = useState(() => {
    if (initialChapterId && currentSectionIndex >= 0) {
      const section = bookSections[currentSectionIndex];
      return section.sections.findIndex((chapter: any) => chapter.id === initialChapterId);
    }
    return 0;
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentSection = bookSections[currentSectionIndex];
  const currentChapter = currentSection?.sections[currentChapterIndex];

  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    } else if (currentSectionIndex > 0) {
      const prevSection = bookSections[currentSectionIndex - 1];
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentChapterIndex(prevSection.sections.length - 1);
    }
  };

  const goToNextChapter = () => {
    if (currentChapterIndex < currentSection.sections.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    } else if (currentSectionIndex < bookSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentChapterIndex(0);
    }
  };

  const goToChapter = (sectionIndex: number, chapterIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentChapterIndex(chapterIndex);
    setSidebarOpen(false);
  };

  const hasPreviousChapter = currentSectionIndex > 0 || currentChapterIndex > 0;
  const hasNextChapter = 
    currentSectionIndex < bookSections.length - 1 || 
    currentChapterIndex < currentSection.sections.length - 1;

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      {/* Cosmic background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15),transparent),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.15),transparent),radial-gradient(circle_at_40%_40%,rgba(120,200,255,0.1),transparent)]"></div>
      </div>

      {/* Table of Contents Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 glass border-r border-border/30 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border/30">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Table of Contents
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-purple-300 hover:text-purple-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-purple-300/80 mt-1">You Are A Poem by Zeke Iverson</p>
          </div>

          {/* Sections and Chapters */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {bookSections.map((section: any, sectionIndex: number) => (
                <div key={section.id} className="space-y-2">
                  <h3 className="font-semibold text-purple-300 text-sm tracking-wide uppercase">
                    {section.title}
                  </h3>
                  <div className="space-y-1 ml-2">
                    {section.sections.map((chapter: any, chapterIndex: number) => (
                      <button
                        key={chapter.id}
                        onClick={() => goToChapter(sectionIndex, chapterIndex)}
                        className={`w-full text-left p-2 rounded-lg text-sm transition-all ${
                          currentSectionIndex === sectionIndex && currentChapterIndex === chapterIndex
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                            : 'text-slate-300 hover:bg-purple-500/10 hover:text-purple-300'
                        }`}
                      >
                        <div className="font-medium">{chapter.sectionNumber}</div>
                        <div className="text-xs opacity-80 line-clamp-1">{chapter.title}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border/30">
            <Link href="/">
              <Button variant="outline" size="sm" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Writing Sanctuary
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="glass border-b border-border/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-purple-300 hover:text-purple-200"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <h1 className="text-lg font-semibold text-white">You Are A Poem</h1>
                <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-300">
                  by Zeke Iverson
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousChapter}
                disabled={!hasPreviousChapter}
                className="text-purple-300 hover:text-purple-200 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextChapter}
                disabled={!hasNextChapter}
                className="text-purple-300 hover:text-purple-200 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chapter Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto p-8">
              {currentChapter && (
                <Card className="glass border-border/30">
                  <CardHeader className="text-center pb-6">
                    <div className="space-y-2">
                      <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                        {currentSection.title}
                      </Badge>
                      <CardTitle className="text-2xl font-bold text-white">
                        {currentChapter.title}
                      </CardTitle>
                      <p className="text-purple-300/80">{currentChapter.sectionNumber}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="prose prose-invert prose-purple max-w-none">
                    <div className="text-slate-200 leading-relaxed whitespace-pre-line text-base">
                      {currentChapter.content}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Footer */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
                <Button
                  variant="outline"
                  onClick={goToPreviousChapter}
                  disabled={!hasPreviousChapter}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Chapter
                </Button>

                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <Heart className="w-4 h-4" />
                  <span>{currentSectionIndex + 1} of {bookSections.length} sections</span>
                </div>

                <Button
                  variant="outline"
                  onClick={goToNextChapter}
                  disabled={!hasNextChapter}
                  className="flex items-center gap-2"
                >
                  Next Chapter
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}