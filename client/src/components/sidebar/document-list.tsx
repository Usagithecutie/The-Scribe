import { Document } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { MoreVertical, FileText } from "lucide-react";
import { formatDate, truncateText } from "@/lib/editor-utils";

interface DocumentListProps {
  documents: Document[];
  currentDocumentId?: number;
  onDocumentSelect: (document: Document) => void;
  onDocumentDelete?: (id: number) => void;
}

export function DocumentList({ 
  documents, 
  currentDocumentId, 
  onDocumentSelect, 
  onDocumentDelete 
}: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No documents yet</p>
        <p className="text-sm text-muted-foreground">Create your first document to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className={`group p-3 rounded-xl transition-all cursor-pointer border-l-4 ${
            currentDocumentId === doc.id
              ? 'bg-primary/10 border-primary'
              : 'bg-muted/50 hover:bg-primary/5 border-transparent'
          }`}
          onClick={() => onDocumentSelect(doc)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">
                {doc.title || 'Untitled Document'}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {truncateText(doc.content.replace(/<[^>]*>/g, ''), 60)}
              </p>
              <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                <span>{formatDate(doc.updatedAt)}</span>
                <span>•</span>
                <span>{doc.wordCount} words</span>
              </div>
            </div>
            {onDocumentDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onDocumentDelete(doc.id);
                }}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
