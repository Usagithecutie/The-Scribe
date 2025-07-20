import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { EnhancedRichTextEditor, type EditorRef } from "@/components/editor/enhanced-rich-text-editor";
import { EnhancedToolbar } from "@/components/editor/enhanced-toolbar";
import { EnhancedSidebar } from "@/components/sidebar/enhanced-sidebar";
import { useTheme } from "@/components/theme-provider";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { apiRequest } from "@/lib/queryClient";
import { Document, insertDocumentSchema, type InsertDocument } from "@shared/schema";
import { 
  Save, 
  Download, 
  Moon, 
  Sun, 
  Menu,
  Clock,
  Type,
  Hash,
  Sparkles
} from "lucide-react";
import { formatDateRelative, exportDocumentAsText, exportDocumentAsHTML } from "@/lib/editor-utils";

// Auto-save interval in milliseconds (30 seconds)
const AUTO_SAVE_INTERVAL = 30000;

export default function EnhancedEditor() {
  const [title, setTitle] = useState("Untitled Document");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [currentDocumentId, setCurrentDocumentId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const editorRef = useRef<EditorRef>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  // Fetch documents
  const { data: documents = [], isLoading: documentsLoading } = useQuery<Document[]>({
    queryKey: ['/api/documents'],
  });

  // Separate documents by status
  const activeDocuments = documents.filter(doc => !doc.isArchived && !doc.isTrashed);
  const archivedDocuments = documents.filter(doc => doc.isArchived && !doc.isTrashed);
  const trashedDocuments = documents.filter(doc => doc.isTrashed);

  // Save document mutation
  const saveDocumentMutation = useMutation({
    mutationFn: async (data: InsertDocument & { id?: number }) => {
      if (data.id) {
        return apiRequest(`/api/documents/${data.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else {
        return apiRequest('/api/documents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }
    },
    onSuccess: (savedDocument: Document) => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      setCurrentDocumentId(savedDocument.id);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      toast({
        title: "Saved",
        description: "Document saved successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Save failed",
        description: "Failed to save document. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/documents/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({
        title: "Moved to trash",
        description: "Document moved to trash successfully",
      });
    },
  });

  // Archive document mutation
  const archiveDocumentMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: true }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({
        title: "Archived",
        description: "Document archived successfully",
      });
    },
  });

  // Restore document mutation
  const restoreDocumentMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: false, isTrashed: false }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({
        title: "Restored",
        description: "Document restored successfully",
      });
    },
  });

  // Permanent delete mutation
  const permanentDeleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/documents/${id}?permanent=true`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({
        title: "Deleted",
        description: "Document permanently deleted",
      });
    },
  });

  // Auto-save functionality
  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      if (hasUnsavedChanges && (title.trim() || content.trim())) {
        handleSave();
      }
    }, AUTO_SAVE_INTERVAL);
  }, [hasUnsavedChanges, title, content]);

  // Handle content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setHasUnsavedChanges(true);
  };

  const handleWordCountChange = (words: number, chars: number) => {
    setWordCount(words);
    setCharCount(chars);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setHasUnsavedChanges(true);
  };

  // Save document
  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      toast({
        title: "Nothing to save",
        description: "Document is empty",
        variant: "destructive",
      });
      return;
    }

    const documentData = {
      ...(currentDocumentId && { id: currentDocumentId }),
      title: title.trim() || "Untitled Document",
      content,
      wordCount,
      characterCount: charCount,
    };

    saveDocumentMutation.mutate(documentData);
  };

  // Document management functions
  const handleNewDocument = () => {
    setTitle("Untitled Document");
    setContent("");
    setWordCount(0);
    setCharCount(0);
    setCurrentDocumentId(null);
    setHasUnsavedChanges(false);
    setLastSaved(null);
    editorRef.current?.focus();
  };

  const handleDocumentSelect = (document: Document) => {
    setTitle(document.title);
    setContent(document.content);
    setWordCount(document.wordCount || 0);
    setCharCount(document.characterCount || 0);
    setCurrentDocumentId(document.id);
    setHasUnsavedChanges(false);
    setLastSaved(new Date(document.updatedAt));
    
    if (isMobile) {
      setSidebarOpen(false);
    }
    
    // Focus editor after a short delay
    setTimeout(() => {
      editorRef.current?.focus();
    }, 100);
  };

  const handleDocumentDelete = (id: number) => {
    deleteDocumentMutation.mutate(id);
    if (currentDocumentId === id) {
      handleNewDocument();
    }
  };

  const handleDocumentArchive = (id: number) => {
    archiveDocumentMutation.mutate(id);
    if (currentDocumentId === id) {
      handleNewDocument();
    }
  };

  const handleDocumentRestore = (id: number) => {
    restoreDocumentMutation.mutate(id);
  };

  const handleDocumentPermanentDelete = (id: number) => {
    permanentDeleteMutation.mutate(id);
    if (currentDocumentId === id) {
      handleNewDocument();
    }
  };

  const handleDocumentDuplicate = (document: Document) => {
    const duplicatedDoc = {
      title: `${document.title} (Copy)`,
      content: document.content,
      wordCount: document.wordCount,
      characterCount: document.characterCount,
    };
    
    saveDocumentMutation.mutate(duplicatedDoc);
  };

  const handleDocumentExport = (document: Document) => {
    exportDocumentAsHTML(document.title, document.content);
    toast({
      title: "Exported",
      description: "Document exported successfully",
    });
  };

  const handleExportAll = () => {
    activeDocuments.forEach(doc => {
      exportDocumentAsText(doc.title, doc.content);
    });
    toast({
      title: "Exported all",
      description: `${activeDocuments.length} documents exported`,
    });
  };

  // Auto-save effect
  useEffect(() => {
    if (hasUnsavedChanges) {
      scheduleAutoSave();
    }
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [scheduleAutoSave, hasUnsavedChanges]);

  // Close sidebar on mobile when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // Load welcome document on first visit
  useEffect(() => {
    if (!documentsLoading && documents.length === 0) {
      setTitle("Your Writing Sanctuary 🎀");
      setContent(`
        <h1>Welcome to Your Writing Sanctuary</h1>
        <p>This is your personal space for creativity and expression. Start writing your thoughts, stories, or any content that comes to mind.</p>
        
        <h2>Features</h2>
        <ul>
          <li><strong>Rich Text Editor:</strong> Format your text with bold, italic, headers, and more</li>
          <li><strong>Auto-Save:</strong> Your work is automatically saved every 30 seconds</li>
          <li><strong>Document Management:</strong> Organize your writings in the sidebar</li>
          <li><strong>Read Zeke's Book:</strong> Access the complete "You Are A Poem" collection</li>
        </ul>
        
        <blockquote>
          <p>"You are not just reading poetry—you are poetry. Every breath, every heartbeat, every moment of your existence is a verse in the grand poem of life."</p>
        </blockquote>
        
        <p>Happy writing! ✨</p>
      `);
      setHasUnsavedChanges(true);
    }
  }, [documentsLoading, documents.length]);

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative">
      {/* Cosmic background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15),transparent),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.15),transparent),radial-gradient(circle_at_40%_40%,rgba(120,200,255,0.1),transparent)]"></div>
      </div>
      {/* Enhanced Sidebar */}
      <EnhancedSidebar
        documents={activeDocuments}
        archivedDocuments={archivedDocuments}
        trashedDocuments={trashedDocuments}
        currentDocumentId={currentDocumentId}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onDocumentSelect={handleDocumentSelect}
        onNewDocument={handleNewDocument}
        onDocumentDelete={handleDocumentDelete}
        onDocumentArchive={handleDocumentArchive}
        onDocumentRestore={handleDocumentRestore}
        onDocumentPermanentDelete={handleDocumentPermanentDelete}
        onDocumentDuplicate={handleDocumentDuplicate}
        onDocumentExport={handleDocumentExport}
        onExportAll={handleExportAll}
      />

      {/* Main Editor */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <div className="glass border-b border-border/30 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}
              
              <div className="flex items-center gap-3">
                <Input
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-lg font-semibold bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-white placeholder:text-white/60"
                  placeholder="Document title..."
                />
                {hasUnsavedChanges && (
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Unsaved
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Stats */}
              <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Type className="w-4 h-4" />
                  {wordCount} words
                </span>
                <span className="flex items-center gap-1">
                  <Hash className="w-4 h-4" />
                  {charCount} chars
                </span>
                {lastSaved && (
                  <span className="flex items-center gap-1">
                    <Save className="w-4 h-4" />
                    {formatDateRelative(lastSaved)}
                  </span>
                )}
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                title="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Manual Save */}
              <Button
                onClick={handleSave}
                disabled={saveDocumentMutation.isPending || !hasUnsavedChanges}
                size="sm"
                className="flex items-center gap-2"
              >
                {saveDocumentMutation.isPending ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Toolbar */}
        <EnhancedToolbar
          editor={editorRef.current?.editor}
          onSave={handleSave}
          onExport={() => currentDocumentId && handleDocumentExport(documents.find(d => d.id === currentDocumentId)!)}
          isSaving={saveDocumentMutation.isPending}
        />

        {/* Editor Content */}
        <div className="flex-1 overflow-hidden">
          <EnhancedRichTextEditor
            ref={editorRef}
            content={content}
            onChange={handleContentChange}
            onWordCountChange={handleWordCountChange}
            placeholder="Start writing your story..."
            className="h-full"
          />
        </div>

        {/* Status Bar */}
        <div className="glass border-t border-border/30 px-4 py-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>{wordCount} words • {charCount} characters</span>
              {lastSaved && (
                <span>Last saved {formatDateRelative(lastSaved)}</span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {hasUnsavedChanges && (
                <span className="flex items-center gap-1 text-amber-500">
                  <Clock className="w-3 h-3" />
                  Auto-save in progress...
                </span>
              )}
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Writing Sanctuary
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}