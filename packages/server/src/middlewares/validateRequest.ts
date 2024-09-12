import { CustomError } from '@/util';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(', ');

    next(new CustomError(400, errorMessage));
    return;
  }

  next();
};

export default validateRequest;
