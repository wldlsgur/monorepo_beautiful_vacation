import { body, param } from 'express-validator';

const validateAuth = {
  kakaoLogin: [
    body('code')
      .notEmpty()
      .withMessage('Code is required')
      .isString()
      .withMessage('Code must be a valid string'),
  ],
  accessRoom: [
    param('roomId')
      .notEmpty()
      .withMessage('Room ID is required')
      .isInt()
      .withMessage('Room ID must be a valid integer'),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isString()
      .withMessage('Password must be a valid string'),
  ],
};

export default validateAuth;
