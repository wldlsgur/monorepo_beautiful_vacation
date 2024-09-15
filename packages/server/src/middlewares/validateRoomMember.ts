import { param } from 'express-validator';

const validateRoomMember = {
  exitRoom: [
    param('roomId').isInt().withMessage('Room ID must be a valid integer'),
  ],
};

export default validateRoomMember;
