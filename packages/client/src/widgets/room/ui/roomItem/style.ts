import styled from 'styled-components';

export const RoomItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 0.8rem;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.08);
    transform: translateY(0);
  }
`;

export const RoomTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Participants = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;
