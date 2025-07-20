import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  FileText, 
  Archive, 
  Trash2, 
  Search, 
  MoreHorizontal,
  Copy,
  Download,
  RotateCcw,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  FolderArchive,
  Settings,
  Download as DownloadAll
} from "lucide-react";
import { Document } from "@shared/schema";
import { formatDateRelative } from "@/lib/editor-utils";
import { Link } from "wouter";

interface EnhancedSidebarProps {
  documents: Document[];
  archivedDocuments: Document[];
  trashedDocuments: Document[];
  currentDocumentId: number | null;
  isOpen: boolean;
  onToggle: () => void;
  onDocumentSelect: (document: Document) => void;
  onNewDocument: () => void;
  onDocumentDelete: (id: number) => void;
  onDocumentArchive: (id: number) => void;
  onDocumentRestore: (id: number) => void;
  onDocumentPermanentDelete: (id: number) => void;
  onDocumentDuplicate: (document: Document) => void;
  onDocumentExport: (document: Document) => void;
  onExportAll: () => void;
}

export function EnhancedSidebar({
  documents,
  archivedDocuments,
  trashedDocuments,
  currentDocumentId,
  isOpen,
  onToggle,
  onDocumentSelect,
  onNewDocument,
  onDocumentDelete,
  onDocumentArchive,
  onDocumentRestore,
  onDocumentPermanentDelete,
  onDocumentDuplicate,
  onDocumentExport,
  onExportAll,
}: EnhancedSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [trashOpen, setTrashOpen] = useState(false);

  // Filter documents based on search
  const filterDocuments = (docs: Document[]) => {
    if (!searchQuery.trim()) return docs;
    return docs.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredDocuments = filterDocuments(documents);
  const filteredArchived = filterDocuments(archivedDocuments);
  const filteredTrashed = filterDocuments(trashedDocuments);

  const DocumentItem = ({ 
    document, 
    isActive, 
    variant = "active" 
  }: { 
    document: Document; 
    isActive: boolean; 
    variant?: "active" | "archived" | "trashed";
  }) => (
    <div 
      className={`group relative p-3 rounded-lg transition-all cursor-pointer ${
        isActive 
          ? 'bg-primary/20 border border-primary/30' 
          : 'hover:bg-card/60 border border-transparent hover:border-border/50'
      }`}
      onClick={() => onDocumentSelect(document)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-sm line-clamp-1 ${
            isActive ? 'text-primary' : 'text-foreground'
          }`}>
            {document.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {document.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span>{document.wordCount || 0} words</span>
            <span>•</span>
            <span>{formatDateRelative(new Date(document.updatedAt))}</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {variant === "active" && (
              <>
                <DropdownMenuItem onClick={() => onDocumentDuplicate(document)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDocumentExport(document)}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDocumentArchive(document.id)}>
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDocumentDelete(document.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Move to Trash
                </DropdownMenuItem>
              </>
            )}
            
            {variant === "archived" && (
              <>
                <DropdownMenuItem onClick={() => onDocumentRestore(document.id)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDocumentExport(document)}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDocumentDelete(document.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Move to Trash
                </DropdownMenuItem>
              </>
            )}

            {variant === "trashed" && (
              <>
                <DropdownMenuItem onClick={() => onDocumentRestore(document.id)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Forever
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Forever</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete "{document.title}". This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onDocumentPermanentDelete(document.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Forever
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <div className="w-80 glass border-r border-border/30 flex flex-col h-full relative z-20">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Writing Sanctuary</h2>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex gap-2 mb-4">
          <Button onClick={onNewDocument} size="sm" className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            New Document
          </Button>
          <Link href="/book">
            <Button variant="outline" size="sm" title="Read Zeke's Book">
              <BookOpen className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Document List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Active Documents */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Documents
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {filteredDocuments.length}
                </Badge>
                {documents.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={onExportAll}>
                        <DownloadAll className="w-4 h-4 mr-2" />
                        Export All
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    {searchQuery ? "No documents found" : "No documents yet"}
                  </p>
                  {!searchQuery && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={onNewDocument}
                      className="mt-2"
                    >
                      Create your first document
                    </Button>
                  )}
                </div>
              ) : (
                filteredDocuments.map((document) => (
                  <DocumentItem
                    key={document.id}
                    document={document}
                    isActive={document.id === currentDocumentId}
                    variant="active"
                  />
                ))
              )}
            </div>
          </div>

          {/* Archived Documents */}
          {archivedDocuments.length > 0 && (
            <Collapsible open={archiveOpen} onOpenChange={setArchiveOpen}>
              <div>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-between p-0 h-auto font-medium text-muted-foreground hover:text-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <FolderArchive className="w-4 h-4" />
                      <span>Archive</span>
                      <Badge variant="secondary" className="text-xs">
                        {filteredArchived.length}
                      </Badge>
                    </div>
                    {archiveOpen ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-3">
                  {filteredArchived.map((document) => (
                    <DocumentItem
                      key={document.id}
                      document={document}
                      isActive={document.id === currentDocumentId}
                      variant="archived"
                    />
                  ))}
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}

          {/* Trashed Documents */}
          {trashedDocuments.length > 0 && (
            <Collapsible open={trashOpen} onOpenChange={setTrashOpen}>
              <div>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-between p-0 h-auto font-medium text-muted-foreground hover:text-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Trash</span>
                      <Badge variant="secondary" className="text-xs">
                        {filteredTrashed.length}
                      </Badge>
                    </div>
                    {trashOpen ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-3">
                  {filteredTrashed.map((document) => (
                    <DocumentItem
                      key={document.id}
                      document={document}
                      isActive={document.id === currentDocumentId}
                      variant="trashed"
                    />
                  ))}
                  <div className="px-3 py-2 text-xs text-muted-foreground bg-muted/30 rounded-lg">
                    Documents in trash will be permanently deleted after 30 days
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Total documents:</span>
            <span>{documents.length + archivedDocuments.length}</span>
          </div>
          {archivedDocuments.length > 0 && (
            <div className="flex justify-between">
              <span>Archived:</span>
              <span>{archivedDocuments.length}</span>
            </div>
          )}
          {trashedDocuments.length > 0 && (
            <div className="flex justify-between">
              <span>In trash:</span>
              <span>{trashedDocuments.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}