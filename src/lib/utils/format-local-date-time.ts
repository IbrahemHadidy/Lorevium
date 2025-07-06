import type { Locale } from 'next-intl';

/**
 * Format a date string or Date object to a string in the given locale,
 * using the user's timezone.
 *
 * @param date The date to format. If a string, it must be in ISO 8601
 * format.
 * @param locale The locale to use for formatting.
 * @param options Additional options for formatting. See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * for available options.
 * @returns A string representing the given date in the given locale.
 */
export function formatLocalDateTime(
  date: string | Date,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
    ...options,
  }).format(dateObj);
}
