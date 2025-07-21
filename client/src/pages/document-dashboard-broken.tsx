import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { apiRequest } from "@/lib/queryClient";
import { Document, type InsertDocument } from "@shared/schema";
import { 
  Plus, 
  FileText, 
  Search, 
  Calendar, 
  Hash, 
  Type,
  Moon,
  Sun,
  Sparkles,
  Edit3,
  Trash2,
  Archive,
  MoreVertical
} from "lucide-react";
import { GlobalSidebar } from "@/components/layout/global-sidebar";
import { formatDateRelative } from "@/lib/editor-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function DocumentDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  // Fetch documents
  const { data: documents = [], isLoading } = useQuery<Document[]>({
    queryKey: ['/api/documents'],
  });

  // Filter documents based on search
  const filteredDocuments = documents
    .filter(doc => !doc.isTrashed && !doc.isArchived)
    .filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Create new document mutation
  const createDocumentMutation = useMutation({
    mutationFn: async (data: InsertDocument) => {
      return apiRequest('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    onSuccess: (document: Document) => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      setLocation(`/editor?id=${document.id}`);
      toast({
        title: "Document created",
        description: "New document created successfully",
      });
    },
  });

  // Delete document mutation
  const deleteDocumentMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isTrashed: true }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({
        title: "Moved to trash",
        description: "Document moved to trash successfully",
      });
    },
  });

  const handleCreateDocument = () => {
    createDocumentMutation.mutate({
      title: "Untitled Document",
      content: "",
      wordCount: 0,
      characterCount: 0,
    });
  };

  const handleOpenDocument = (id: number) => {
    setLocation(`/editor?id=${id}`);
  };

  const DocumentCard = ({ document }: { document: Document }) => (
    <Card 
      className={`
        group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-800/50 to-purple-900/20 border-purple-500/20 hover:border-purple-400/40 glass' 
          : 'bg-gradient-to-br from-white/80 to-purple-50/60 border-purple-200/40 hover:border-purple-300/60 glass-light'
        }
      `}
      onClick={() => handleOpenDocument(document.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-medium truncate mb-1 group-hover:text-purple-300 transition-colors">
              {document.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{formatDateRelative(new Date(document.updatedAt))}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                handleOpenDocument(document.id);
              }}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDocumentMutation.mutate(document.id);
                }}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {document.content || "No content yet..."}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Type className="w-3 h-3" />
              <span>{document.wordCount} words</span>
            </div>
            <div className="flex items-center gap-1">
              <Hash className="w-3 h-3" />
              <span>{document.characterCount} chars</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CreateDocumentCard = () => (
    <Card 
      className={`
        group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer
        border-2 border-dashed
        ${theme === 'dark' 
          ? 'border-purple-500/30 hover:border-purple-400/50 bg-gradient-to-br from-slate-800/30 to-purple-900/10 glass' 
          : 'border-purple-300/40 hover:border-purple-400/60 bg-gradient-to-br from-white/60 to-purple-50/40 glass-light'
        }
      `}
      onClick={handleCreateDocument}
    >
      <CardContent className="p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300
          ${theme === 'dark' 
            ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30' 
            : 'bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200'
          }
        `}>
          <Plus className={`w-8 h-8 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`} />
        </div>
        <h3 className="font-medium mb-2 group-hover:text-purple-300 transition-colors">
          Create New Document
        </h3>
        <p className="text-sm text-muted-foreground">
          Start writing something beautiful
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 light:from-slate-50 light:via-purple-50/50 light:to-slate-100 relative">
      {/* Cosmic background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15),transparent),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.15),transparent),radial-gradient(circle_at_40%_40%,rgba(120,200,255,0.1),transparent)]"></div>
      </div>

      {/* Global Sidebar for Document Dashboard */}
      <GlobalSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main content area */}
      <div className={`flex-1 flex flex-col relative z-10 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        {/* Header */}
        <div className={`
          sticky top-0 z-50 border-b backdrop-blur-xl
          ${theme === 'dark' 
            ? 'bg-slate-900/80 border-purple-500/20' 
            : 'bg-white/80 border-purple-200/40'
          }
        `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <h1 className="text-xl font-semibold">Writing Sanctuary</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 bg-background/50"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9 p-0 rounded-full"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <CreateDocumentCard />
            {filteredDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        )}

        {filteredDocuments.length === 0 && !isLoading && searchQuery && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or create a new document.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}