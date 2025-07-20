import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  bookContent, 
  getAllSections, 
  getSectionById, 
  getNextSection, 
  getPreviousSection,
  categories,
  BookSection,
  BookChapter 
} from "@shared/book-content";
import { 
  Book, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  Menu,
  X
} from "lucide-react";

export default function BookReader() {
  const params = useParams();
  const [location, navigate] = useLocation();
  const [currentSection, setCurrentSection] = useState<BookSection | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<"reader" | "contents" | "categories">("reader");

  // Get section from URL params
  useEffect(() => {
    if (params.sectionId) {
      const section = getSectionById(params.sectionId);
      setCurrentSection(section || null);
    } else {
      // Default to first section
      const firstSection = getAllSections()[0];
      if (firstSection) {
        setCurrentSection(firstSection);
        navigate(`/book/${firstSection.id}`);
      }
    }
  }, [params.sectionId, navigate]);

  const handleSectionSelect = (section: BookSection) => {
    setCurrentSection(section);
    navigate(`/book/${section.id}`);
    setSidebarOpen(false);
  };

  const handleNextSection = () => {
    if (currentSection) {
      const next = getNextSection(currentSection.id);
      if (next) {
        handleSectionSelect(next);
      }
    }
  };

  const handlePreviousSection = () => {
    if (currentSection) {
      const prev = getPreviousSection(currentSection.id);
      if (prev) {
        handleSectionSelect(prev);
      }
    }
  };

  const TableOfContents = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          You Are A Poem, And The World Is Reading You
        </h2>
        <p className="text-muted-foreground">By Zeke Iverson</p>
      </div>
      
      <div className="space-y-4">
        {bookContent.map((chapter) => (
          <Card key={chapter.id} className="bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span>{chapter.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {chapter.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionSelect(section)}
                  className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-muted/50 ${
                    currentSection?.id === section.id ? 'bg-primary/10 border border-primary/20' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{section.title}</p>
                      <p className="text-sm text-muted-foreground">{section.sectionNumber}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {section.category}
                    </Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const CategoryView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
        <p className="text-muted-foreground">Explore themes that resonate with you</p>
      </div>
      
      <div className="grid gap-4">
        {categories.map((category) => {
          const sectionsInCategory = getAllSections().filter(s => s.category === category);
          return (
            <Card key={category} className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-400" />
                  {category}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {sectionsInCategory.length} sections
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sectionsInCategory.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionSelect(section)}
                      className="w-full text-left p-2 rounded hover:bg-muted/50 transition-colors"
                    >
                      <p className="font-medium text-sm">{section.title}</p>
                      <p className="text-xs text-muted-foreground">{section.sectionNumber}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/editor">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Editor
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5 text-purple-400" />
                <span className="font-semibold hidden sm:inline">Book Reader</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:sticky top-[73px] h-[calc(100vh-73px)] w-80 bg-card/50 backdrop-blur border-r border-border 
            z-40 transform transition-transform duration-300 overflow-hidden
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="h-full flex flex-col">
            <Tabs value={activeView} onValueChange={(v) => setActiveView(v as typeof activeView)} className="flex-1">
              <div className="p-4 border-b border-border">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="reader" className="text-xs">Reader</TabsTrigger>
                  <TabsTrigger value="contents" className="text-xs">Contents</TabsTrigger>
                  <TabsTrigger value="categories" className="text-xs">Categories</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="reader" className="flex-1 m-0">
                <ScrollArea className="h-full p-4">
                  {currentSection && (
                    <div className="space-y-4">
                      <div className="text-center space-y-2">
                        <Badge variant="outline">{currentSection.category}</Badge>
                        <h3 className="font-semibold">{currentSection.title}</h3>
                        <p className="text-sm text-muted-foreground">{currentSection.sectionNumber}</p>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handlePreviousSection}
                          disabled={!getPreviousSection(currentSection.id)}
                          className="w-full"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Previous Section
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleNextSection}
                          disabled={!getNextSection(currentSection.id)}
                          className="w-full"
                        >
                          Next Section
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="contents" className="flex-1 m-0">
                <ScrollArea className="h-full p-4">
                  <TableOfContents />
                </ScrollArea>
              </TabsContent>

              <TabsContent value="categories" className="flex-1 m-0">
                <ScrollArea className="h-full p-4">
                  <CategoryView />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-73px)]">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {currentSection ? (
              <div className="space-y-8">
                {/* Section Header */}
                <div className="text-center space-y-4">
                  <Badge variant="outline" className="mb-2">
                    {currentSection.category}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {currentSection.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {currentSection.sectionNumber}
                  </p>
                </div>

                {/* Section Content */}
                <Card className="bg-card/50 backdrop-blur">
                  <CardContent className="p-8">
                    <div className="prose prose-lg prose-invert max-w-none">
                      {currentSection.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="leading-relaxed text-gray-200 mb-6">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation Footer */}
                <div className="flex justify-between items-center pt-8">
                  <Button
                    variant="outline"
                    onClick={handlePreviousSection}
                    disabled={!getPreviousSection(currentSection.id)}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleNextSection}
                    disabled={!getNextSection(currentSection.id)}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Book className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-2">Section Not Found</h2>
                <p className="text-muted-foreground mb-4">
                  The section you're looking for doesn't exist.
                </p>
                <Button onClick={() => navigate('/book')}>
                  Go to Contents
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}