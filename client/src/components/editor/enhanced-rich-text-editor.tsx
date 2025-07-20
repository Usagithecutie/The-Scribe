import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { countWords, countCharacters } from '@/lib/editor-utils';

interface EnhancedRichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onWordCountChange?: (wordCount: number, charCount: number) => void;
  placeholder?: string;
  className?: string;
}

export interface EditorRef {
  editor: any;
  focus: () => void;
  getHTML: () => string;
  setContent: (content: string) => void;
}

export const EnhancedRichTextEditor = forwardRef<EditorRef, EnhancedRichTextEditorProps>(({ 
  content, 
  onChange, 
  onWordCountChange, 
  placeholder = "Start writing your masterpiece...",
  className = ""
}, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
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
        class: `prose prose-lg prose-invert max-w-none focus:outline-none leading-relaxed min-h-[500px] p-6 ${className}`,
        'data-placeholder': placeholder,
      },
    },
  });

  useImperativeHandle(ref, () => ({
    editor,
    focus: () => editor?.commands.focus(),
    getHTML: () => editor?.getHTML() || '',
    setContent: (newContent: string) => editor?.commands.setContent(newContent),
  }));

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1">
      <style>
        {`
          .ProseMirror {
            outline: none;
            min-height: 500px;
            padding: 24px;
            line-height: 1.8;
            font-size: 16px;
            color: #e5e7eb;
            background: transparent;
          }
          
          .ProseMirror::before {
            content: attr(data-placeholder);
            position: absolute;
            color: #6b7280;
            pointer-events: none;
            height: 0;
            opacity: 1;
          }
          
          .ProseMirror:focus::before,
          .ProseMirror:not(:empty)::before {
            opacity: 0;
          }
          
          .ProseMirror h1 {
            font-size: 2.5em;
            font-weight: 700;
            margin: 0.67em 0;
            color: #f3f4f6;
            background: linear-gradient(135deg, #8b5cf6, #f472b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .ProseMirror h2 {
            font-size: 2em;
            font-weight: 600;
            margin: 0.75em 0;
            color: #e5e7eb;
          }
          
          .ProseMirror h3 {
            font-size: 1.5em;
            font-weight: 600;
            margin: 0.83em 0;
            color: #d1d5db;
          }
          
          .ProseMirror p {
            margin: 1em 0;
            line-height: 1.8;
          }
          
          .ProseMirror ul, .ProseMirror ol {
            margin: 1em 0;
            padding-left: 2em;
          }
          
          .ProseMirror li {
            margin: 0.5em 0;
            line-height: 1.6;
          }
          
          .ProseMirror blockquote {
            border-left: 4px solid #8b5cf6;
            margin: 1.5em 0;
            padding: 0.5em 0 0.5em 1em;
            font-style: italic;
            background: rgba(139, 92, 246, 0.05);
            border-radius: 0 8px 8px 0;
          }
          
          .ProseMirror code {
            background: rgba(139, 92, 246, 0.1);
            border: 1px solid rgba(139, 92, 246, 0.2);
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            padding: 0.2em 0.4em;
            font-size: 0.9em;
          }
          
          .ProseMirror hr {
            border: none;
            height: 2px;
            background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
            margin: 2em 0;
            border-radius: 2px;
          }
          
          .ProseMirror strong {
            font-weight: 700;
            color: #f9fafb;
          }
          
          .ProseMirror em {
            font-style: italic;
            color: #d1d5db;
          }
          
          .ProseMirror u {
            text-decoration: underline;
            text-decoration-color: #8b5cf6;
            text-underline-offset: 2px;
          }
          
          .ProseMirror[data-placeholder]:empty::before {
            content: attr(data-placeholder);
            color: #6b7280;
            pointer-events: none;
            position: absolute;
            font-style: italic;
          }

          /* Responsive adjustments */
          @media (max-width: 640px) {
            .ProseMirror {
              padding: 16px;
              font-size: 14px;
            }
            
            .ProseMirror h1 {
              font-size: 2em;
            }
            
            .ProseMirror h2 {
              font-size: 1.5em;
            }
            
            .ProseMirror h3 {
              font-size: 1.25em;
            }
          }
        `}
      </style>
      <EditorContent 
        editor={editor} 
        className="min-h-full prose prose-invert max-w-none"
      />
    </div>
  );
});

EnhancedRichTextEditor.displayName = "EnhancedRichTextEditor";