import { HttpError } from '../types';

/**
 * Returns a new HttpError to be thrown in API routes.
 * Also, logs the error and the message before throwing.
 * @param message The error message.
 * @param error The error object
 * @param statusCode The HTTP status code to be returned. Defaults to 500.
 * @returns a new instance of HttpError with the provided message and status code.
 */
export function newApiError(message: string, error: unknown, statusCode: number = 500): HttpError {
      console.error(message, error);
      return new HttpError(message, statusCode);
}

export function newApiErrorWithMessage(message: string, statusCode: number = 500): HttpError {
    return newApiError(message, new Error(message), statusCode);
}