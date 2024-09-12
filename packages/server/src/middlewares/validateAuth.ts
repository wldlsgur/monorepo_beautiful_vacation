import { body } from 'express-validator';

const validateAuth = {
  kakaoLogin: [
    body('code')
      .notEmpty()
      .withMessage('Code is required')
      .isString()
      .withMessage('Code must be a valid string'),
  ],
};

export default validateAuth;
