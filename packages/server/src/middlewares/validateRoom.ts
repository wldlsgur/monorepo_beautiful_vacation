import { body, param, query } from 'express-validator';

const validateRoom = {
  createRoom: [
    body('room_name')
      .notEmpty()
      .withMessage('Room name is required')
      .isString()
      .withMessage('Room name must be a valid string'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isString()
      .withMessage('Password must be a valid string'),
    body('max_participants')
      .notEmpty()
      .withMessage('Max participants is required')
      .isInt({ min: 1, max: Number.MAX_SAFE_INTEGER })
      .withMessage('Max participants must be a positive integer'),
  ],
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
      .notEmpty()
      .withMessage('Max participants is required')
      .isInt({ min: 1, max: Number.MAX_SAFE_INTEGER })
      .withMessage('Max participants must be a positive integer'),
  ],
  getRoom: [
    param('roomId').isInt().withMessage('Room ID must be a valid integer'),
  ],
  getRoomList: [
    query('limit')
      .isInt({ min: 1 })
      .withMessage('Limit must be a positive integer'),
    query('offset')
      .isInt({ min: 0 })
      .withMessage('Offset must be a non-negative integer'),
  ],
  getSearchRoom: [
    query('keyword')
      .notEmpty()
      .withMessage('Keyword cannot be empty')
      .isString()
      .withMessage('Keyword must be a valid string'),
    query('limit')
      .isInt({ min: 1 })
      .withMessage('Limit must be a positive integer'),
    query('offset')
      .isInt({ min: 0 })
      .withMessage('Offset must be a non-negative integer'),
  ],
  deleteRoom: [
    param('roomId').isInt().withMessage('Room ID must be a valid integer'),
  ],
};

export default validateRoom;
