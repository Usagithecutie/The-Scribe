import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEffect } from 'react';
import { countWords, countCharacters } from '@/lib/editor-utils';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onWordCountChange?: (wordCount: number, charCount: number) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ 
  content, 
  onChange, 
  onWordCountChange, 
  placeholder = "Start writing...",
  className = ""
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      Color.configure({
        types: ['textStyle'],
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
        class: `prose prose-lg max-w-none focus:outline-none text-gray-200 leading-relaxed ${className}`,
        placeholder,
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-[600px]">
      <EditorContent 
        editor={editor} 
        className="min-h-full outline-none"
      />
    </div>
  );
}

export { useEditor };
