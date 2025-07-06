/**
 * Get error message from API error response
 * @returns {string} Error message
 * @param {unknown} error
 */
export function getErrorMessage(error: unknown): string {
  console.error(error);

  let message = 'An unknown error occurred';

  if (typeof error === 'object' && error !== null) {
    if ('data' in error && error.data && typeof error.data === 'object') {
      const data = error.data as Record<string, unknown>;
      if (typeof data.error === 'string') message = data.error;
      if (typeof data.message === 'string') message = data.message;
    }
    if ('message' in error && typeof error.message === 'string') {
      message = error.message;
    }
  } else if (typeof error === 'string') {
    message = error;
  }

  return message;
}
