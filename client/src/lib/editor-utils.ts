// Utility functions for the editor

export function countWords(html: string): number {
  // Strip HTML tags and count words
  const text = html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ');
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

export function countCharacters(html: string, includeSpaces = true): number {
  // Strip HTML tags and count characters
  const text = html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ');
  return includeSpaces ? text.length : text.replace(/\s/g, '').length;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function formatDateRelative(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y ago`;
}

export function exportDocumentAsText(title: string, content: string): void {
  // Strip HTML and create text file
  const text = content.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ');
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportDocumentAsHTML(title: string, content: string): void {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1, h2, h3, h4, h5, h6 { color: #333; }
        blockquote { border-left: 4px solid #6366f1; padding-left: 20px; margin: 20px 0; font-style: italic; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: 'Monaco', monospace; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    ${content}
</body>
</html>`;
  
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}