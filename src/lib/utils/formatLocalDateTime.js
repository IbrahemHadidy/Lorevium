export function formatLocalDateTime(
  date,
  locale,
  options
) {
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
