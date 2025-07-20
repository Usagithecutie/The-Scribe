import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Toolbar } from "@/components/editor/toolbar";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { WritingPrompts } from "@/components/prompts/writing-prompts";
import { AdviceBoard } from "@/components/advice/advice-board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Document, InsertDocument, UpdateDocument, WritingPrompt } from "@shared/schema";
import { Menu, Sun, Moon, PenTool, Heart, Sparkles } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { apiRequest } from "@/lib/queryClient";
import { useEditor } from "@/components/editor/rich-text-editor";

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentContent, setDocumentContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
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
      toast({ title: "Document deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete document", variant: "destructive" });
    },
  });

  // Auto-save effect
  useEffect(() => {
    if (!currentDocument) return;

    const autoSaveInterval = setInterval(() => {
      if (documentTitle !== currentDocument.title || documentContent !== currentDocument.content) {
        handleSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
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

    createDocumentMutation.mutate(newDoc, {
      onSuccess: (createdDoc) => {
        setCurrentDocument(createdDoc);
        setDocumentTitle(createdDoc.title);
        setDocumentContent(createdDoc.content);
        setWordCount(0);
        setCharCount(0);
      },
    });
  };

  const handleDocumentSelect = (document: Document) => {
    setCurrentDocument(document);
    setDocumentTitle(document.title);
    setDocumentContent(document.content);
    setWordCount(document.wordCount);
    setCharCount(document.characterCount);
    setActiveTab("editor");
  };

  const handleCreateFromPrompt = (prompt: WritingPrompt) => {
    const promptDocument: InsertDocument = {
      title: `Inspired by: ${prompt.title}`,
      content: `<h2>${prompt.title}</h2><p><em>${prompt.content}</em></p><hr><p>Your writing begins here...</p>`,
      wordCount: 0,
      characterCount: 0,
    };
    
    createDocumentMutation.mutate(promptDocument, {
      onSuccess: (newDoc) => {
        setCurrentDocument(newDoc);
        setDocumentTitle(newDoc.title);
        setDocumentContent(newDoc.content);
        setWordCount(0);
        setCharCount(0);
        setActiveTab("editor");
        toast({ title: "New document created from prompt!" });
      }
    });
  };

  const handleSave = () => {
    if (!currentDocument) return;

    const updates: UpdateDocument = {
      title: documentTitle,
      content: documentContent,
      wordCount,
      characterCount: charCount,
    };

    updateDocumentMutation.mutate({ id: currentDocument.id, updates });
  };

  const handleTitleChange = (title: string) => {
    setDocumentTitle(title);
  };

  const handleContentChange = (content: string) => {
    setDocumentContent(content);
  };

  const handleWordCountChange = useCallback((words: number, chars: number) => {
    setWordCount(words);
    setCharCount(chars);
  }, []);

  const handleDeleteDocument = (id: number) => {
    deleteDocumentMutation.mutate(id, {
      onSuccess: () => {
        if (currentDocument?.id === id) {
          // If deleting current document, select another one or clear
          const remainingDocs = documents.filter(doc => doc.id !== id);
          if (remainingDocs.length > 0) {
            handleDocumentSelect(remainingDocs[0]);
          } else {
            setCurrentDocument(null);
            setDocumentTitle("");
            setDocumentContent("");
            setWordCount(0);
            setCharCount(0);
          }
        }
      },
    });
  };

  const handleExport = async () => {
    if (!currentDocument) return;

    try {
      const response = await fetch(`/api/export/text/${currentDocument.id}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentDocument.title}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast({ title: "Document exported successfully" });
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      toast({ title: "Failed to export document", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading your writing sanctuary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-primary/20"
            >
              <Menu className="h-4 w-4 text-primary" />
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-xl">🪶</span>
              <span className="font-semibold text-lg">Rei's Writing Sanctuary</span>
              <span className="text-primary">🎀</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{charCount} characters</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-primary/20 rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-primary" />
              ) : (
                <Moon className="h-4 w-4 text-primary" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 h-[calc(100vh-72px)]">
        {/* Sidebar */}
        <Sidebar
          documents={documents}
          currentDocumentId={currentDocument?.id}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onDocumentSelect={handleDocumentSelect}
          onNewDocument={handleNewDocument}
          onExport={handleExport}
          onDeleteDocument={handleDeleteDocument}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mt-4">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="prompts" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Prompts
              </TabsTrigger>
              <TabsTrigger value="advice" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Advice
              </TabsTrigger>
            </TabsList>

            {/* Editor Tab */}
            <TabsContent value="editor" className="flex-1">
              {currentDocument ? (
                <>
                  {/* Toolbar */}
                  <Toolbar
                    editor={null} // This will be passed from RichTextEditor
                    onSave={handleSave}
                    isSaving={updateDocumentMutation.isPending}
                  />

                  {/* Editor Area */}
                  <div className="flex-1 relative">
                    {/* Celestial background */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-slate-800/10 to-indigo-900/20">
                        {/* Subtle star field */}
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
                          <circle cx="900" cy="650" r="1.5" fill="url(#editorStar)" />
                        </svg>
                      </div>
                    </div>

                    <div className="relative z-10 h-full p-8">
                      <div className="max-w-4xl mx-auto h-full">
                    {/* Document Title */}
                    <Input
                      type="text"
                      value={documentTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      onBlur={handleSave}
                      placeholder="Untitled Document"
                      className="w-full bg-transparent border-none outline-none text-3xl font-bold text-foreground placeholder-muted-foreground mb-6 p-0 h-auto resize-none"
                    />

                    {/* Writing Area */}
                    <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-primary/10 p-8 h-[calc(100%-120px)] overflow-y-auto">
                      <RichTextEditor
                        content={documentContent}
                        onChange={handleContentChange}
                        onWordCountChange={handleWordCountChange}
                        placeholder="Start writing your masterpiece..."
                        className="min-h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="bg-card border-t border-border px-6 py-3 flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span>{charCount} characters</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Auto-saved</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Made with 💜 for Rei 🎀</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl mb-4 block">📝</span>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome to your Writing Sanctuary</h2>
                <p className="text-muted-foreground mb-6">Create your first document to start writing</p>
                <Button onClick={handleNewDocument} className="bg-primary hover:bg-primary/90">
                  Create New Document
                </Button>
              </div>
            </div>
          )}
            </TabsContent>

            {/* Writing Prompts Tab */}
            <TabsContent value="prompts" className="flex-1 p-6 overflow-y-auto">
              <WritingPrompts onCreateFromPrompt={handleCreateFromPrompt} />
            </TabsContent>

            {/* Advice Board Tab */}
            <TabsContent value="advice" className="flex-1 p-6 overflow-y-auto">
              <AdviceBoard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
