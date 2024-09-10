import styled from 'styled-components';
import {
  roomItemStyle,
  roomTitleStyle,
  participantsStyle,
} from '@/shared/style';

export const RoomItem = styled.li`
  ${roomItemStyle}
  position: relative;
`;

export const RoomTitle = styled.h3`
  ${roomTitleStyle}
`;

export const Participants = styled.span`
  ${participantsStyle}
`;
