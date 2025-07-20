import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  List, 
  ListOrdered, 
  Quote, 
  Code,
  Undo2, 
  Redo2, 
  Save, 
  Download,
  Type,
  Palette,
  Highlighter,
  Link,
  Image,
  Table,
  MoreHorizontal,
  Heading1,
  Heading2,
  Heading3
} from "lucide-react";
import type { Editor } from '@tiptap/react';

interface EnhancedToolbarProps {
  editor?: Editor | null;
  onSave?: () => void;
  onExport?: () => void;
  isSaving?: boolean;
}

const fontFamilies = [
  { name: "Default", value: "Inter" },
  { name: "Serif", value: "Georgia" },
  { name: "Mono", value: "Monaco" },
  { name: "Sans", value: "Helvetica" },
  { name: "Times", value: "Times New Roman" },
];

const fontSizes = [
  { name: "Small", value: "12px" },
  { name: "Normal", value: "16px" },
  { name: "Large", value: "18px" },
  { name: "XL", value: "24px" },
  { name: "XXL", value: "32px" },
];

const colors = [
  "#000000", "#374151", "#6B7280", "#9CA3AF",
  "#EF4444", "#F97316", "#EAB308", "#22C55E",
  "#3B82F6", "#8B5CF6", "#EC4899", "#F43F5E"
];

export function EnhancedToolbar({ editor, onSave, onExport, isSaving }: EnhancedToolbarProps) {
  const [customColor, setCustomColor] = useState("#000000");
  const [fontSize, setFontSize] = useState([16]);

  if (!editor) {
    return null;
  }

  const DynamicButton = ({ 
    children, 
    isActive = false, 
    onClick, 
    title,
    variant = "ghost" as const,
    className = ""
  }: {
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    title?: string;
    variant?: "ghost" | "default";
    className?: string;
  }) => (
    <Button
      variant={variant}
      size="sm"
      onClick={onClick}
      title={title}
      className={`
        h-9 w-9 p-0 rounded-full transition-all duration-200 
        ${isActive 
          ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-300 shadow-md border-purple-400/30 border' 
          : 'hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10 hover:text-purple-300 hover:shadow-sm'
        }
        ${className}
      `}
    >
      {children}
    </Button>
  );

  return (
    <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border-b border-border/50">
      {/* Dynamic Island Style Container */}
      <div className="flex items-center justify-center p-4">
        <div className="flex items-center gap-1 p-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
          {/* File Operations */}
          <div className="flex items-center gap-1 px-2">
            <DynamicButton onClick={onSave} title="Save" isActive={isSaving}>
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
            </DynamicButton>
            <DynamicButton onClick={onExport} title="Export">
              <Download className="w-4 h-4" />
            </DynamicButton>
          </div>

          <div className="h-6 w-px bg-white/20 mx-1" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1 px-2">
            <DynamicButton 
              onClick={() => editor.chain().focus().undo().run()}
              title="Undo"
              isActive={!editor.can().undo()}
            >
              <Undo2 className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton 
              onClick={() => editor.chain().focus().redo().run()}
              title="Redo"
              isActive={!editor.can().redo()}
            >
              <Redo2 className="w-4 h-4" />
            </DynamicButton>
          </div>

          <div className="h-6 w-px bg-white/20 mx-1" />

          {/* Text Formatting */}
          <div className="flex items-center gap-1 px-2">
            <DynamicButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              title="Underline"
            >
              <Underline className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </DynamicButton>
          </div>

          <div className="h-6 w-px bg-white/20 mx-1" />

          {/* Headings */}
          <div className="flex items-center gap-1 px-2">
            <DynamicButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              title="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              title="Heading 3"
            >
              <Heading3 className="w-4 h-4" />
            </DynamicButton>
          </div>

          <div className="h-6 w-px bg-white/20 mx-1" />

          {/* Text Alignment */}
          <div className="flex items-center gap-1 px-2">
            <DynamicButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              isActive={editor.isActive({ textAlign: 'justify' })}
              title="Justify"
            >
              <AlignJustify className="w-4 h-4" />
            </DynamicButton>
          </div>

          <div className="h-6 w-px bg-white/20 mx-1" />

          {/* Lists */}
          <div className="flex items-center gap-1 px-2">
            <DynamicButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </DynamicButton>
          </div>

          <div className="h-6 w-px bg-white/20 mx-1" />

          {/* Advanced Formatting */}
          <div className="flex items-center gap-1 px-2">
            <DynamicButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </DynamicButton>
            <DynamicButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={editor.isActive('codeBlock')}
              title="Code Block"
            >
              <Code className="w-4 h-4" />
            </DynamicButton>
          </div>

          <div className="h-6 w-px bg-white/20 mx-1" />

          {/* Font Controls */}
          <div className="flex items-center gap-1 px-2">
            {/* Font Family */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <DynamicButton title="Font Family">
                  <Type className="w-4 h-4" />
                </DynamicButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 backdrop-blur-xl border-white/10">
                {fontFamilies.map((font) => (
                  <DropdownMenuItem
                    key={font.value}
                    onClick={() => editor.chain().focus().setFontFamily(font.value).run()}
                    className="hover:bg-purple-500/20"
                  >
                    {font.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Text Color */}
            <Popover>
              <PopoverTrigger asChild>
                <DynamicButton title="Text Color">
                  <Palette className="w-4 h-4" />
                </DynamicButton>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-black/90 backdrop-blur-xl border-white/10">
                <div className="space-y-4">
                  <Label className="text-sm text-white">Text Color</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => editor.chain().focus().setColor(color).run()}
                        className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/40 transition-colors"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-white">Custom Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="w-12 h-8 border-white/20 bg-transparent"
                      />
                      <Button
                        size="sm"
                        onClick={() => editor.chain().focus().setColor(customColor).run()}
                        className="bg-purple-500/20 hover:bg-purple-500/30"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Highlight */}
            <Popover>
              <PopoverTrigger asChild>
                <DynamicButton title="Highlight">
                  <Highlighter className="w-4 h-4" />
                </DynamicButton>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-black/90 backdrop-blur-xl border-white/10">
                <div className="space-y-4">
                  <Label className="text-sm text-white">Highlight Color</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {colors.slice(4).map((color) => (
                      <button
                        key={color}
                        onClick={() => editor.chain().focus().setMark('textStyle', { backgroundColor: color }).run()}
                        className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/40 transition-colors"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => editor.chain().focus().unsetMark('textStyle').run()}
                    variant="outline"
                    className="w-full border-white/20 hover:bg-white/10"
                  >
                    Remove Highlight
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="h-6 w-px bg-white/20 mx-1" />

          {/* More Options */}
          <div className="flex items-center gap-1 px-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <DynamicButton title="More Options">
                  <MoreHorizontal className="w-4 h-4" />
                </DynamicButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 backdrop-blur-xl border-white/10">
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().setHorizontalRule().run()}
                  className="hover:bg-purple-500/20"
                >
                  Insert Horizontal Line
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().clearNodes().run()}
                  className="hover:bg-purple-500/20"
                >
                  Clear Formatting
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => editor.chain().focus().selectAll().run()}
                  className="hover:bg-purple-500/20"
                >
                  Select All
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}