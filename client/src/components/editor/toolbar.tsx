import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Save,
} from 'lucide-react';

interface ToolbarProps {
  editor: Editor | null;
  onSave?: () => void;
  isSaving?: boolean;
}

export function Toolbar({ editor, onSave, isSaving }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  const handleFontSizeChange = (size: string) => {
    editor.chain().focus().run();
  };

  const handleFontFamilyChange = (family: string) => {
    editor.chain().focus().run();
  };

  const handleColorChange = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <div className="bg-card border-b border-border p-4 sticky top-0 z-40">
      <div className="flex flex-wrap items-center gap-2">
        {/* Save Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          disabled={isSaving}
          className="mr-2"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save"}
        </Button>

        <Separator orientation="vertical" className="h-8" />

        {/* Formatting Tools */}
        <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-primary text-primary-foreground' : ''}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-primary text-primary-foreground' : ''}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline?.().run()}
            className={editor.isActive('underline') ? 'bg-primary text-primary-foreground' : ''}
          >
            <Underline className="w-4 h-4" />
          </Button>
        </div>

        {/* Font Size */}
        <Select onValueChange={handleFontSizeChange} defaultValue="14">
          <SelectTrigger className="w-20">
            <SelectValue placeholder="14px" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">8px</SelectItem>
            <SelectItem value="10">10px</SelectItem>
            <SelectItem value="12">12px</SelectItem>
            <SelectItem value="14">14px</SelectItem>
            <SelectItem value="16">16px</SelectItem>
            <SelectItem value="18">18px</SelectItem>
            <SelectItem value="20">20px</SelectItem>
            <SelectItem value="24">24px</SelectItem>
            <SelectItem value="28">28px</SelectItem>
            <SelectItem value="32">32px</SelectItem>
            <SelectItem value="48">48px</SelectItem>
            <SelectItem value="72">72px</SelectItem>
          </SelectContent>
        </Select>

        {/* Font Family */}
        <Select onValueChange={handleFontFamilyChange} defaultValue="inter">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="poppins">Poppins</SelectItem>
            <SelectItem value="georgia">Georgia</SelectItem>
            <SelectItem value="times">Times New Roman</SelectItem>
          </SelectContent>
        </Select>

        {/* Text Colors */}
        <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleColorChange('#8b5cf6')}
            className="w-8 h-8 p-0 bg-purple-500 hover:bg-purple-600"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleColorChange('#e5e7eb')}
            className="w-8 h-8 p-0 bg-gray-300 hover:bg-gray-400"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleColorChange('#f472b6')}
            className="w-8 h-8 p-0 bg-pink-400 hover:bg-pink-500"
          />
        </div>

        {/* Heading levels */}
        <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-primary text-primary-foreground' : ''}
          >
            H1
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-primary text-primary-foreground' : ''}
          >
            H2
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'bg-primary text-primary-foreground' : ''}
          >
            P
          </Button>
        </div>
      </div>
    </div>
  );
}
