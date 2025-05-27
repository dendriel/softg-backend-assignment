import type { Request, Response, NextFunction } from 'express';

/**
 * Decorates an async handler function to catch errors and pass them to the next middleware.
 * It also sends a JSON response with a success status code.
 *
 * @param {Function} handler - The async function to wrap.
 * @param {number} [successStatus=200] - The HTTP status code to send on success.
 * @returns {Function} A middleware function that handles the request and response.
 */
export function wrapAsync<T>(
  handler: (request: Request, response: Response) => Promise<T>, successStatus: number = 200
): (req: Request, res: Response, next: NextFunction) => void {
  if (typeof handler !== 'function') {
    throw new Error('Provided handler must be a function');
  }

  const exec = async (request: Request, res: Response): Promise<T> => handler(request, res);

  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      exec(req, res)
        .then((response) => {
          res.status(successStatus).json(response);
        })
        .catch((err: unknown) => {
          next(err);
        });
    } catch (error) {
      next(error);
    }
  };
}
