import { Document } from "@shared/schema";
import { EnhancedDocumentList } from "./enhanced-document-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, Settings, X, Book, Sparkles, Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "wouter";

interface EnhancedSidebarProps {
  documents: Document[];
  currentDocumentId?: number;
  isOpen: boolean;
  onToggle: () => void;
  onDocumentSelect: (document: Document) => void;
  onNewDocument: () => void;
  onDocumentDelete?: (id: number) => void;
  onDocumentDuplicate?: (document: Document) => void;
  onDocumentExport?: (document: Document) => void;
  onExportAll?: () => void;
  onSettings?: () => void;
}

export function EnhancedSidebar({
  documents,
  currentDocumentId,
  isOpen,
  onToggle,
  onDocumentSelect,
  onNewDocument,
  onDocumentDelete,
  onDocumentDuplicate,
  onDocumentExport,
  onExportAll,
  onSettings,
}: EnhancedSidebarProps) {
  const isMobile = useIsMobile();

  const totalWords = documents.reduce((sum, doc) => sum + (doc.wordCount || 0), 0);
  const totalCharacters = documents.reduce((sum, doc) => sum + (doc.characterCount || 0), 0);

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? 'fixed' : 'sticky'} top-0 h-screen w-80 bg-card/80 backdrop-blur border-r border-border 
          flex flex-col z-50 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${!isMobile ? 'lg:translate-x-0' : ''}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">Documents</h2>
              <Badge variant="outline" className="text-xs">
                {documents.length}
              </Badge>
            </div>
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={onToggle}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={onNewDocument}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Document
            </Button>
            
            {/* Quick Stats */}
            {documents.length > 0 && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-muted/50 rounded p-2 text-center">
                  <div className="font-medium">{totalWords.toLocaleString()}</div>
                  <div className="text-muted-foreground">Total Words</div>
                </div>
                <div className="bg-muted/50 rounded p-2 text-center">
                  <div className="font-medium">{totalCharacters.toLocaleString()}</div>
                  <div className="text-muted-foreground">Total Chars</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-border">
          <div className="space-y-2">
            <Link href="/book" className="block">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Book className="w-4 h-4 mr-3 text-purple-400" />
                Read "You Are A Poem"
              </Button>
            </Link>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Prompts
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <Heart className="w-3 h-3 mr-1" />
                Advice
              </Button>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Recent Documents
              </h3>
              {documents.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {documents.length} {documents.length === 1 ? 'document' : 'documents'}
                </span>
              )}
            </div>
            
            <EnhancedDocumentList
              documents={documents}
              currentDocumentId={currentDocumentId}
              onDocumentSelect={onDocumentSelect}
              onDocumentDelete={onDocumentDelete}
              onDocumentDuplicate={onDocumentDuplicate}
              onDocumentExport={onDocumentExport}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          {onExportAll && documents.length > 0 && (
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={onExportAll}
              size="sm"
            >
              <Download className="w-4 h-4 mr-3" />
              Export All Documents
            </Button>
          )}
          {onSettings && (
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={onSettings}
              size="sm"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          )}
          <div className="pt-2 text-center">
            <p className="text-xs text-muted-foreground">
              Made with 💜 for Rei 🎀
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}