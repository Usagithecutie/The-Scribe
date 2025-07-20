import { Document } from "@shared/schema";
import { DocumentList } from "./document-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Download, Settings, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  documents: Document[];
  currentDocumentId?: number;
  isOpen: boolean;
  onToggle: () => void;
  onDocumentSelect: (document: Document) => void;
  onNewDocument: () => void;
  onExport?: () => void;
  onSettings?: () => void;
  onDeleteDocument?: (id: number) => void;
}

export function Sidebar({
  documents,
  currentDocumentId,
  isOpen,
  onToggle,
  onDocumentSelect,
  onNewDocument,
  onExport,
  onSettings,
  onDeleteDocument,
}: SidebarProps) {
  const isMobile = useIsMobile();

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
          ${isMobile ? 'fixed' : 'sticky'} top-0 h-screen w-80 bg-card border-r border-border 
          flex flex-col z-50 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${!isMobile ? 'lg:translate-x-0' : ''}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Documents</h2>
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={onToggle}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <Button 
            onClick={onNewDocument}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Document
          </Button>
        </div>

        {/* Document List */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
            Recent Documents
          </h3>
          <DocumentList
            documents={documents}
            currentDocumentId={currentDocumentId}
            onDocumentSelect={onDocumentSelect}
            onDocumentDelete={onDeleteDocument}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          {onExport && (
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={onExport}
            >
              <Download className="w-4 h-4 mr-3" />
              Export Documents
            </Button>
          )}
          {onSettings && (
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={onSettings}
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
