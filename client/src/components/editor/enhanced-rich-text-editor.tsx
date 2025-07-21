import { useEditor, EditorContent, Editor } from '@tiptap/react';
import { forwardRef, useImperativeHandle, useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Image from '@tiptap/extension-image';
import { countWords, countCharacters } from '@/lib/editor-utils';

export interface EditorRef {
  editor: Editor | null;
  focus: () => void;
  getContent: () => string;
  setContent: (content: string) => void;
}

interface EnhancedRichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onWordCountChange?: (wordCount: number, charCount: number) => void;
  placeholder?: string;
  className?: string;
}

export const EnhancedRichTextEditor = forwardRef<EditorRef, EnhancedRichTextEditorProps>(
  ({ content, onChange, onWordCountChange, placeholder = "Start writing...", className = "" }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        TextStyle,
        Color,
        FontFamily.configure({
          types: ['textStyle'],
        }),
        Image.configure({
          inline: true,
          allowBase64: true,
        }),
      ],
      content,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange(html);
        
        if (onWordCountChange) {
          const wordCount = countWords(html);
          const charCount = countCharacters(html);
          onWordCountChange(wordCount, charCount);
        }
      },
      editorProps: {
        attributes: {
          class: `prose prose-invert max-w-none focus:outline-none min-h-[600px] p-8 ${className}`,
          style: 'color: inherit; background: transparent;'
        },
      },
    });

    useImperativeHandle(ref, () => ({
      editor,
      focus: () => {
        editor?.commands.focus();
      },
      getContent: () => {
        return editor?.getHTML() || '';
      },
      setContent: (newContent: string) => {
        editor?.commands.setContent(newContent);
      },
    }));

    // Update content when prop changes
    useEffect(() => {
      if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content);
      }
    }, [content, editor]);

    // Set placeholder
    useEffect(() => {
      if (editor) {
        const placeholderExt = editor.extensionManager.extensions.find(
          (extension) => extension.name === 'placeholder'
        );
        if (placeholderExt && placeholderExt.options) {
          placeholderExt.options.placeholder = placeholder;
        }
      }
    }, [editor, placeholder]);

    if (!editor) {
      return (
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading editor...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-full overflow-auto">
        <EditorContent 
          editor={editor} 
          className="h-full"
        />
        
        {/* Custom Styles for the Editor */}
        <style>{`
          .ProseMirror {
            color: inherit !important;
            background: transparent !important;
            line-height: 1.7 !important;
            font-size: 16px !important;
            font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
          }
          
          .ProseMirror:focus {
            outline: none !important;
          }
          
          .ProseMirror p {
            margin: 1em 0 !important;
            color: inherit !important;
          }
          
          .ProseMirror p.is-editor-empty:first-child::before {
            color: rgb(156 163 175) !important;
            content: attr(data-placeholder) !important;
            float: left !important;
            height: 0 !important;
            pointer-events: none !important;
          }
          
          .ProseMirror h1, .ProseMirror h2, .ProseMirror h3,
          .ProseMirror h4, .ProseMirror h5, .ProseMirror h6 {
            color: inherit !important;
            font-weight: 600 !important;
            margin-top: 2em !important;
            margin-bottom: 1em !important;
          }
          
          .ProseMirror h1 {
            font-size: 2.5em !important;
            background: linear-gradient(135deg, #8b5cf6, #ec4899) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
          }
          
          .ProseMirror h2 {
            font-size: 2em !important;
            color: #a855f7 !important;
          }
          
          .ProseMirror h3 {
            font-size: 1.5em !important;
            color: #c084fc !important;
          }
          
          .ProseMirror blockquote {
            border-left: 4px solid #8b5cf6 !important;
            padding-left: 1.5rem !important;
            margin: 1.5rem 0 !important;
            font-style: italic !important;
            color: #d1d5db !important;
            background: rgba(139, 92, 246, 0.1) !important;
            border-radius: 0 8px 8px 0 !important;
            padding: 1rem 1.5rem !important;
          }
          
          .ProseMirror code {
            background: rgba(139, 92, 246, 0.2) !important;
            padding: 0.25rem 0.5rem !important;
            border-radius: 0.375rem !important;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
            font-size: 0.875em !important;
            color: #f3e8ff !important;
          }
          
          .ProseMirror pre {
            background: rgba(0, 0, 0, 0.5) !important;
            padding: 1.5rem !important;
            border-radius: 0.75rem !important;
            margin: 1.5rem 0 !important;
            overflow-x: auto !important;
            border: 1px solid rgba(139, 92, 246, 0.3) !important;
          }
          
          .ProseMirror pre code {
            background: none !important;
            padding: 0 !important;
            color: #f8fafc !important;
          }
          
          .ProseMirror ul, .ProseMirror ol {
            margin: 1rem 0 !important;
            padding-left: 2rem !important;
          }
          
          .ProseMirror ul li, .ProseMirror ol li {
            margin: 0.5rem 0 !important;
            color: inherit !important;
          }
          
          .ProseMirror ul li::marker {
            color: #8b5cf6 !important;
          }
          
          .ProseMirror ol li::marker {
            color: #8b5cf6 !important;
            font-weight: 600 !important;
          }
          
          .ProseMirror hr {
            border: none !important;
            height: 2px !important;
            background: linear-gradient(90deg, transparent, #8b5cf6, transparent) !important;
            margin: 3rem 0 !important;
          }
          
          .ProseMirror strong {
            color: #f3e8ff !important;
            font-weight: 600 !important;
          }
          
          .ProseMirror em {
            color: #e9d5ff !important;
          }
          
          .ProseMirror u {
            text-decoration: underline !important;
            text-decoration-color: #8b5cf6 !important;
            text-decoration-thickness: 2px !important;
          }
          
          .ProseMirror s {
            text-decoration: line-through !important;
            text-decoration-color: #ef4444 !important;
          }
          
          /* Light mode styles */
          [data-theme="light"] .ProseMirror {
            color: #1f2937 !important;
          }
          
          [data-theme="light"] .ProseMirror p.is-editor-empty:first-child::before {
            color: rgb(107 114 128) !important;
          }
          
          [data-theme="light"] .ProseMirror blockquote {
            color: #4b5563 !important;
            background: rgba(139, 92, 246, 0.05) !important;
          }
          
          [data-theme="light"] .ProseMirror code {
            background: rgba(139, 92, 246, 0.1) !important;
            color: #5b21b6 !important;
          }
          
          [data-theme="light"] .ProseMirror pre {
            background: rgba(139, 92, 246, 0.05) !important;
            border: 1px solid rgba(139, 92, 246, 0.2) !important;
          }
          
          [data-theme="light"] .ProseMirror pre code {
            color: #1f2937 !important;
          }
          
          [data-theme="light"] .ProseMirror strong {
            color: #111827 !important;
          }
          
          [data-theme="light"] .ProseMirror em {
            color: #374151 !important;
          }
        `}</style>
      </div>
    );
  }
);