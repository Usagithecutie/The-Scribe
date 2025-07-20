import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Save,
  Palette,
  Type,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Undo,
  Redo,
  Plus,
  Download
} from 'lucide-react';

interface EnhancedToolbarProps {
  editor: Editor | null;
  onSave?: () => void;
  onExport?: () => void;
  isSaving?: boolean;
}

const FONT_SIZES = [
  { label: '8px', value: '8px' },
  { label: '10px', value: '10px' },
  { label: '12px', value: '12px' },
  { label: '14px', value: '14px' },
  { label: '16px', value: '16px' },
  { label: '18px', value: '18px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '28px', value: '28px' },
  { label: '32px', value: '32px' },
  { label: '36px', value: '36px' },
  { label: '48px', value: '48px' },
  { label: '64px', value: '64px' },
  { label: '72px', value: '72px' },
];

const FONT_FAMILIES = [
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, sans-serif' },
  { label: 'Courier New', value: '"Courier New", monospace' },
  { label: 'Poppins', value: 'Poppins, sans-serif' },
  { label: 'Playfair Display', value: '"Playfair Display", serif' },
];

const COLORS = [
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#f472b6' },
  { name: 'White', value: '#ffffff' },
  { name: 'Gray', value: '#6b7280' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Yellow', value: '#f59e0b' },
  { name: 'Red', value: '#ef4444' },
];

export function EnhancedToolbar({ editor, onSave, onExport, isSaving }: EnhancedToolbarProps) {
  if (!editor) {
    return null;
  }

  const handleFontSizeChange = (size: string) => {
    // Apply font size via CSS style for now
    const selection = editor.view.state.selection;
    if (selection) {
      editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
    }
  };

  const handleFontFamilyChange = (family: string) => {
    // Apply font family via CSS style for now
    const selection = editor.view.state.selection;
    if (selection) {
      editor.chain().focus().setMark('textStyle', { fontFamily: family }).run();
    }
  };

  const handleColorChange = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <div className="bg-card border-b border-border sticky top-0 z-40">
      <div className="p-3 space-y-3">
        {/* Row 1: Main Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save"}</span>
          </Button>

          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          )}

          <Separator orientation="vertical" className="h-8 hidden sm:block" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Row 2: Formatting Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Font Family */}
          <Select onValueChange={handleFontFamilyChange} defaultValue="Inter, sans-serif">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              {FONT_FAMILIES.map(font => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Font Size */}
          <Select onValueChange={handleFontSizeChange} defaultValue="16px">
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {FONT_SIZES.map(size => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-8 hidden sm:block" />

          {/* Text Style */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'bg-primary text-primary-foreground' : ''}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'bg-primary text-primary-foreground' : ''}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'bg-primary text-primary-foreground' : ''}
              title="Underline"
            >
              <Underline className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive('code') ? 'bg-primary text-primary-foreground' : ''}
              title="Code"
            >
              <Code className="w-4 h-4" />
            </Button>
          </div>

          {/* Color Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" title="Text Color">
                <Palette className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-3">
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map(color => (
                  <button
                    key={color.value}
                    className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorChange(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Row 3: Paragraph & List Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Heading levels */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'bg-primary text-primary-foreground' : ''}
              title="Heading 1"
            >
              H1
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'bg-primary text-primary-foreground' : ''}
              title="Heading 2"
            >
              H2
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'bg-primary text-primary-foreground' : ''}
              title="Heading 3"
            >
              H3
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive('paragraph') ? 'bg-primary text-primary-foreground' : ''}
              title="Paragraph"
            >
              P
            </Button>
          </div>

          <Separator orientation="vertical" className="h-8 hidden sm:block" />

          {/* Lists */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'bg-primary text-primary-foreground' : ''}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'bg-primary text-primary-foreground' : ''}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={editor.isActive({ textAlign: 'left' }) ? 'bg-primary text-primary-foreground' : ''}
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={editor.isActive({ textAlign: 'center' }) ? 'bg-primary text-primary-foreground' : ''}
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={editor.isActive({ textAlign: 'right' }) ? 'bg-primary text-primary-foreground' : ''}
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Quote & Divider */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'bg-primary text-primary-foreground' : ''}
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Horizontal Rule"
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}