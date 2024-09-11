import { body, param } from 'express-validator';

const validateRoom = {
  patchRoom: [
    param('roomId').isInt().withMessage('Room ID must be a valid integer'),
    body('room_name')
      .isString()
      .withMessage('Room name must be a string')
      .notEmpty()
      .withMessage('Room name cannot be empty'),
    body('password')
      .isString()
      .withMessage('Password must be a string')
      .notEmpty()
      .withMessage('Password cannot be empty'),
    body('max_participants')
      .isInt({ min: 1, max: Number.MAX_SAFE_INTEGER })
      .withMessage(
        'Max participants must be a positive integer and cannot exceed the maximum allowed value',
      ),
  ],
};

export default validateRoom;
