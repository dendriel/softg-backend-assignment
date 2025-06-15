import {HttpError} from '../types';

/**
 * Returns a new HttpError to be thrown in API routes.
 * Also, logs the error and the message before throwing.
 * @param {string} message The error message.
 * @param {unknown} error The error object
 * @param {number} statusCode The HTTP status code to be returned. Defaults to 500.
 * @return {HttpError} a new instance of HttpError with the provided message and status code.
 */
export function newApiError(message: string, error: unknown, statusCode: number = 500): HttpError {
  console.error(message, error);
  return new HttpError(message, statusCode);
}

export function newApiErrorWithMessage(message: string, statusCode: number = 500): HttpError {
  return newApiError(message, new Error(message), statusCode);
}
