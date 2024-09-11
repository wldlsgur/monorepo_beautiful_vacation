import { RoomResponse } from 'common-types';

export const ROOM_FORM = {
  DEFAULT_VALUES: {
    room_name: '',
    password: '',
    max_participants: 0,
  },
  DYNAMIC_DEFAULT_VALUES: ({
    room_name,
    max_participants,
  }: RoomResponse['data']) => ({
    room_name,
    password: '',
    max_participants,
  }),
  VALIDATION_RULES: {
    ROOM_NAME: {
      required: '제목은 필수 입력 항목입니다.',
    },
    PASSWORD: {
      required: '비밀번호는 필수 입력 항목입니다.',
    },
    MAX_PARTICIPANTS: {
      required: '최대 인원은 필수 입력 항목입니다.',
      valueAsNumber: true,
      min: {
        value: 1,
        message: '최대 인원은 1 이상이어야 합니다.',
      },
      max: {
        value: Number.MAX_SAFE_INTEGER,
        message: `최대 인원은 ${Number.MAX_SAFE_INTEGER} 이하이어야 합니다.`,
      },
    },
  },
};
