export function getErrorMessage(error) {
  console.error(error);

  let message = 'An unknown error occurred';

  if (typeof error === 'object' && error !== null) {
    if ('data' in error && error.data && typeof error.data === 'object') {
      const data = error.data;
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
