import { useState } from "react";
import { Document } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  FileText, 
  MoreVertical, 
  Trash2, 
  Copy, 
  Download,
  BookOpen,
  Clock
} from "lucide-react";
import { formatDateAbsolute, stripHtml, truncateText } from "@/lib/editor-utils";

interface EnhancedDocumentListProps {
  documents: Document[];
  currentDocumentId?: number;
  onDocumentSelect: (document: Document) => void;
  onDocumentDelete?: (id: number) => void;
  onDocumentDuplicate?: (document: Document) => void;
  onDocumentExport?: (document: Document) => void;
}

export function EnhancedDocumentList({
  documents,
  currentDocumentId,
  onDocumentSelect,
  onDocumentDelete,
  onDocumentDuplicate,
  onDocumentExport,
}: EnhancedDocumentListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);

  const handleDeleteClick = (document: Document, e: React.MouseEvent) => {
    e.stopPropagation();
    setDocumentToDelete(document);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (documentToDelete && onDocumentDelete) {
      onDocumentDelete(documentToDelete.id);
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  const handleDuplicateClick = (document: Document, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDocumentDuplicate) {
      onDocumentDuplicate(document);
    }
  };

  const handleExportClick = (document: Document, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDocumentExport) {
      onDocumentExport(document);
    }
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm mb-2">No documents yet</p>
        <p className="text-xs opacity-75">
          Create your first document to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        {documents.map((document) => (
          <Card
            key={document.id}
            className={`cursor-pointer transition-all hover:bg-muted/50 border ${
              currentDocumentId === document.id
                ? 'bg-primary/5 border-primary/20 shadow-sm' 
                : 'bg-card/50 border-border/50 hover:border-border'
            }`}
            onClick={() => onDocumentSelect(document)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <h4 className="font-medium text-sm truncate">
                      {document.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Content preview */}
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {document.content 
                        ? truncateText(stripHtml(document.content), 100)
                        : "Empty document"
                      }
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{document.wordCount || 0} words</span>
                      <span>{document.characterCount || 0} chars</span>
                    </div>
                    
                    {/* Date */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatDateAbsolute(document.updatedAt)}</span>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {onDocumentDuplicate && (
                      <DropdownMenuItem onClick={(e) => handleDuplicateClick(document, e)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                    )}
                    {onDocumentExport && (
                      <DropdownMenuItem onClick={(e) => handleExportClick(document, e)}>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                    )}
                    {(onDocumentDuplicate || onDocumentExport) && onDocumentDelete && (
                      <DropdownMenuSeparator />
                    )}
                    {onDocumentDelete && (
                      <DropdownMenuItem 
                        onClick={(e) => handleDeleteClick(document, e)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{documentToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}