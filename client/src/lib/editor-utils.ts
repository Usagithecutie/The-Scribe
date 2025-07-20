export function countWords(text: string): number {
  if (!text.trim()) return 0;
  // Remove HTML tags and count words
  const plainText = text.replace(/<[^>]*>/g, '');
  return plainText.trim().split(/\s+/).length;
}

export function countCharacters(text: string): number {
  // Remove HTML tags and count characters
  const plainText = text.replace(/<[^>]*>/g, '');
  return plainText.length;
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return 'Invalid date';
  
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.floor((dateObj.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    'day'
  );
}

export function formatDateAbsolute(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return 'Invalid date';
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}
