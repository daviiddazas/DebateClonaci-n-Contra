/**
 * Utility functions for reliable cross-browser media embedding and image rendering.
 */

/**
 * Normalizes image URLs for optimal loading and zero-redirect delivery.
 * Automatically converts GitHub repository blob URLs (?raw=true) to direct raw CDN URLs,
 * preventing cross-origin 302 redirect blocking in production and embedded iframes.
 */
export function formatMediaUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.includes('github.com') && trimmed.includes('/blob/')) {
    return trimmed
      .replace('github.com/', 'raw.githubusercontent.com/')
      .replace('/blob/', '/')
      .replace('?raw=true', '');
  }
  return trimmed;
}

/**
 * Checks if a URL points to a YouTube video.
 */
export function isYoutubeUrl(url?: string): boolean {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
}

/**
 * Checks if a URL points to a direct video file.
 */
export function isDirectVideoUrl(url?: string): boolean {
  if (!url) return false;
  return (
    url.endsWith('.mp4') ||
    url.endsWith('.webm') ||
    url.endsWith('.mov') ||
    url.includes('vimeo.com')
  );
}

/**
 * Extracts the YouTube embed URL from various YouTube formats (watch, share, shorts, embed).
 */
export function getYoutubeEmbedUrl(url: string, autoplay = false): string {
  try {
    const autoplayParam = autoplay ? '&autoplay=1' : '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?rel=0${autoplayParam}`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?rel=0${autoplayParam}`;
    }
    if (url.includes('youtube.com/shorts/')) {
      const id = url.split('shorts/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?rel=0${autoplayParam}`;
    }
    if (url.includes('youtube.com/embed/')) {
      return `${url}${autoplay ? '?autoplay=1&rel=0' : '?rel=0'}`;
    }
  } catch {
    return url;
  }
  return url;
}
