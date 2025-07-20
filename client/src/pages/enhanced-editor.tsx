import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { EnhancedSidebar } from "@/components/sidebar/enhanced-sidebar";
import { EnhancedToolbar } from "@/components/editor/enhanced-toolbar";
import { EnhancedRichTextEditor, EditorRef } from "@/components/editor/enhanced-rich-text-editor";
import { WritingPrompts } from "@/components/prompts/writing-prompts";
import { AdviceBoard } from "@/components/advice/advice-board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Document, InsertDocument, UpdateDocument } from "@shared/schema";
import { Menu, Sun, Moon, PenTool, Heart, Sparkles, Save, Clock, BookOpen } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { apiRequest } from "@/lib/queryClient";
import { useIsMobile } from "@/hooks/use-mobile";

export default function EnhancedEditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentContent, setDocumentContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const editorRef = useRef<EditorRef>(null);

  // Fetch all documents
  const { data: documents = [], isLoading } = useQuery<Document[]>({
    queryKey: ["/api/documents"],
  });

  // Create document mutation
  const createDocumentMutation = useMutation({
    mutationFn: async (doc: InsertDocument) => {
      const response = await apiRequest("POST", "/api/documents", doc);
      return response.json();
    },
    onSuccess: (createdDoc) => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      setCurrentDocument(createdDoc);
      setDocumentTitle(createdDoc.title);
      setDocumentContent(createdDoc.content);
      setWordCount(createdDoc.wordCount || 0);
      setCharCount(createdDoc.characterCount || 0);
      setHasUnsavedChanges(false);
      toast({ title: "Document created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create document", variant: "destructive" });
    },
  });

  // Update document mutation
  const updateDocumentMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: UpdateDocument }) => {
      const response = await apiRequest("PATCH", `/api/documents/${id}`, updates);
      return response.json();
    },
    onSuccess: (updatedDoc) => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      setCurrentDocument(updatedDoc);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      toast({ title: "Document saved successfully" });
    },
    onError: () => {
      toast({ title: "Failed to save document", variant: "destructive" });
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/documents/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      // If we deleted the current document, switch to another or create new
      if (currentDocument && documents.length > 1) {
        const nextDoc = documents.find(d => d.id !== currentDocument.id);
        if (nextDoc) {
          handleDocumentSelect(nextDoc);
        }
      } else {
        handleNewDocument();
      }
      toast({ title: "Document deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete document", variant: "destructive" });
    },
  });

  // Auto-save effect
  useEffect(() => {
    if (!currentDocument || !hasUnsavedChanges) return;

    const autoSaveTimeout = setTimeout(() => {
      handleSave();
    }, 30000); // Auto-save after 30 seconds of inactivity

    return () => clearTimeout(autoSaveTimeout);
  }, [currentDocument, hasUnsavedChanges, documentTitle, documentContent]);

  // Track changes
  useEffect(() => {
    if (currentDocument) {
      const titleChanged = documentTitle !== currentDocument.title;
      const contentChanged = documentContent !== currentDocument.content;
      setHasUnsavedChanges(titleChanged || contentChanged);
    }
  }, [currentDocument, documentTitle, documentContent]);

  // Load first document on page load
  useEffect(() => {
    if (documents.length > 0 && !currentDocument) {
      handleDocumentSelect(documents[0]);
    }
  }, [documents, currentDocument]);

  const handleNewDocument = () => {
    const newDoc: InsertDocument = {
      title: "Untitled Document",
      content: "<p>Start writing your masterpiece...</p>",
      wordCount: 0,
      characterCount: 0,
    };

    createDocumentMutation.mutate(newDoc);
  };

  const handleDocumentSelect = (document: Document) => {
    setCurrentDocument(document);
    setDocumentTitle(document.title);
    setDocumentContent(document.content);
    setWordCount(document.wordCount);
    setCharCount(document.characterCount);
    setHasUnsavedChanges(false);
    setLastSaved(document.updatedAt);
    setActiveTab("editor");
    
    // Focus editor after selection
    setTimeout(() => {
      editorRef.current?.focus();
    }, 100);
  };

  const handleSave = useCallback(() => {
    if (!currentDocument) return;

    const updates: UpdateDocument = {
      title: documentTitle,
      content: documentContent,
      wordCount,
      characterCount: charCount,
    };

    updateDocumentMutation.mutate({ id: currentDocument.id, updates });
  }, [currentDocument, documentTitle, documentContent, wordCount, charCount, updateDocumentMutation]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentTitle(e.target.value);
  };

  const handleContentChange = (content: string) => {
    setDocumentContent(content);
  };

  const handleWordCountChange = (words: number, chars: number) => {
    setWordCount(words);
    setCharCount(chars);
  };

  const handleDeleteDocument = (id: number) => {
    deleteDocumentMutation.mutate(id);
  };

  const handleDuplicateDocument = (document: Document) => {
    const duplicateDoc: InsertDocument = {
      title: `${document.title} (Copy)`,
      content: document.content,
      wordCount: document.wordCount,
      characterCount: document.characterCount,
    };
    createDocumentMutation.mutate(duplicateDoc);
  };

  const handleExportDocument = (document: Document) => {
    // Export as text file
    const element = window.document.createElement('a');
    const textContent = document.content.replace(/<[^>]*>/g, ''); // Strip HTML
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${document.title}.txt`;
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);
    toast({ title: "Document exported successfully" });
  };

  const handleExportAll = () => {
    documents.forEach(doc => handleExportDocument(doc));
  };

  const handleKeyboardShortcuts = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      handleNewDocument();
    }
  }, [handleSave]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
  }, [handleKeyboardShortcuts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              <h1 className="text-lg font-semibold hidden sm:block">
                Rei's Writing Sanctuary
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Status */}
            {currentDocument && (
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                {updateDocumentMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : hasUnsavedChanges ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span>Unsaved changes</span>
                  </div>
                ) : lastSaved ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Saved</span>
                  </div>
                ) : null}
              </div>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-72px)]">
        {/* Enhanced Sidebar */}
        <EnhancedSidebar
          documents={documents}
          currentDocumentId={currentDocument?.id}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onDocumentSelect={handleDocumentSelect}
          onNewDocument={handleNewDocument}
          onDocumentDelete={handleDeleteDocument}
          onDocumentDuplicate={handleDuplicateDocument}
          onDocumentExport={handleExportDocument}
          onExportAll={handleExportAll}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b border-border bg-card/50 backdrop-blur">
              <div className="flex items-center justify-between p-4">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="editor" className="flex items-center gap-2">
                    <PenTool className="w-4 h-4" />
                    <span className="hidden sm:inline">Editor</span>
                  </TabsTrigger>
                  <TabsTrigger value="prompts" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">Prompts</span>
                  </TabsTrigger>
                  <TabsTrigger value="advice" className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="hidden sm:inline">Advice</span>
                  </TabsTrigger>
                </TabsList>

                {/* Document Stats */}
                {currentDocument && activeTab === "editor" && (
                  <div className="hidden lg:flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline" className="gap-1">
                      <Clock className="w-3 h-3" />
                      {wordCount} words
                    </Badge>
                    <Badge variant="outline">
                      {charCount} characters
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Editor Tab */}
            <TabsContent value="editor" className="flex-1 flex flex-col m-0">
              {currentDocument ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Document Title */}
                  <div className="p-4 border-b border-border bg-card/30 backdrop-blur">
                    <Input
                      value={documentTitle}
                      onChange={handleTitleChange}
                      className="text-xl font-semibold bg-transparent border-none px-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Document title..."
                    />
                  </div>

                  {/* Enhanced Toolbar */}
                  <EnhancedToolbar
                    editor={editorRef.current?.editor}
                    onSave={handleSave}
                    onExport={() => currentDocument && handleExportDocument(currentDocument)}
                    isSaving={updateDocumentMutation.isPending}
                  />

                  {/* Enhanced Editor */}
                  <div className="flex-1 relative overflow-hidden">
                    {/* Celestial background */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-slate-800/10 to-indigo-900/20">
                        <svg className="w-full h-full" viewBox="0 0 1000 1000">
                          <defs>
                            <radialGradient id="editorStar" cx="0.5" cy="0.5" r="0.5">
                              <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 0.6}} />
                              <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0}} />
                            </radialGradient>
                          </defs>
                          <circle cx="200" cy="150" r="1" fill="url(#editorStar)" />
                          <circle cx="500" cy="200" r="1.5" fill="url(#editorStar)" />
                          <circle cx="800" cy="180" r="1" fill="url(#editorStar)" />
                          <circle cx="300" cy="400" r="1" fill="url(#editorStar)" />
                          <circle cx="700" cy="450" r="1.5" fill="url(#editorStar)" />
                          <circle cx="150" cy="650" r="1" fill="url(#editorStar)" />
                          <circle cx="600" cy="700" r="1" fill="url(#editorStar)" />
                        </svg>
                      </div>
                    </div>

                    <div className="relative z-10 h-full overflow-auto">
                      <EnhancedRichTextEditor
                        ref={editorRef}
                        content={documentContent}
                        onChange={handleContentChange}
                        onWordCountChange={handleWordCountChange}
                        placeholder="Start writing your masterpiece..."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <BookOpen className="w-16 h-16 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">No Document Selected</h3>
                      <p className="text-muted-foreground mb-4">
                        Create a new document or select one from the sidebar to start writing.
                      </p>
                      <Button onClick={handleNewDocument}>
                        <PenTool className="w-4 h-4 mr-2" />
                        Create New Document
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Prompts Tab */}
            <TabsContent value="prompts" className="flex-1 m-0">
              <WritingPrompts onCreateFromPrompt={(prompt) => {
                const newDoc: InsertDocument = {
                  title: prompt.title,
                  content: `<h2>${prompt.title}</h2><p><em>${prompt.content}</em></p><p></p><p>Start writing...</p>`,
                  wordCount: 0,
                  characterCount: 0,
                };
                createDocumentMutation.mutate(newDoc);
              }} />
            </TabsContent>

            {/* Advice Tab */}
            <TabsContent value="advice" className="flex-1 m-0">
              <AdviceBoard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}