/**
 * Utility functions for the editor
 */

/**
 * Count words in HTML content
 */
export function countWords(html: string): number {
  const text = stripHtml(html);
  if (!text.trim()) return 0;
  
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .length;
}

/**
 * Count characters in HTML content (excluding HTML tags)
 */
export function countCharacters(html: string): number {
  const text = stripHtml(html);
  return text.length;
}

/**
 * Strip HTML tags from content
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .trim();
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // If there's a space near the end, cut at the space to avoid cutting words
  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.slice(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

/**
 * Format date for display (relative time)
 */
export function formatDateRelative(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return formatDateAbsolute(date);
}

/**
 * Format date for display (absolute)
 */
export function formatDateAbsolute(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: dateObj.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Generate a reading time estimate
 */
export function estimateReadingTime(wordCount: number): string {
  const wordsPerMinute = 200; // Average reading speed
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  if (minutes < 1) return 'Less than 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, maxWords: number = 30): string {
  const text = stripHtml(content);
  const words = text.split(/\s+/).filter(word => word.length > 0);
  
  if (words.length <= maxWords) return text;
  
  return words.slice(0, maxWords).join(' ') + '...';
}

/**
 * Calculate reading progress percentage
 */
export function calculateReadingProgress(
  currentPosition: number,
  totalHeight: number
): number {
  return Math.min(100, Math.max(0, (currentPosition / totalHeight) * 100));
}

/**
 * Sanitize filename for export
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^\w\s-]/gi, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .toLowerCase()
    .trim();
}