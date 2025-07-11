/**
 * Extract YouTube video ID from URL
 * @param url - YouTube video URL
 * @returns YouTube video ID
 */
export function extractYouTubeVideoId(url: string): string | null {
  const regex = /(?:\?v=|\/embed\/|\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
