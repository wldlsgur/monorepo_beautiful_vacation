import styled from 'styled-components';
import {
  roomItemStyle,
  roomTitleStyle,
  participantsStyle,
} from '@/shared/style';

export const RoomItem = styled.li`
  ${roomItemStyle}
`;

export const RoomTitle = styled.h3`
  ${roomTitleStyle}
`;

export const Participants = styled.span`
  ${participantsStyle}
`;
