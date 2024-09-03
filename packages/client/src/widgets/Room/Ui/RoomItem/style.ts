import styled from 'styled-components';

export const RoomItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 4rem;
  margin: 0 1rem 0 0;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const RoomTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Participants = styled.span`
  color: ${({ theme }) => theme.colors.primaryNormal};
`;
