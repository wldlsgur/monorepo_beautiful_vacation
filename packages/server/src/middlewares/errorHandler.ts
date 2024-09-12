import { CustomError } from '@/util';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = error.status || 500;
  const message = error.message || 'Internal Server Error';

  console.error(`
    ===== Error Log =====
      Status Code: ${statusCode}
      Message: ${message}
      Path: ${req.originalUrl}
      Method: ${req.method}
      Body: ${JSON.stringify(req.body)}
      Params: ${JSON.stringify(req.params)}
      Query: ${JSON.stringify(req.query)}
    =====================
  `);
  res.status(statusCode).json({ message });
};

export default errorHandler;
