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

export const InteractionContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 1rem;
  right: 1.5rem;
  bottom: -1.5rem;
  z-index: 999;
`;
