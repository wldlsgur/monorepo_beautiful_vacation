import styled from 'styled-components';

export const RoomList = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding: 1rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 0.8rem;

  &::-webkit-scrollbar {
    width: 0.8rem;
    background: ${({ theme }) => theme.colors.border};
    border-radius: 0.8rem;
  }

  /* 스크롤바 트랙 스타일 */
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primaryLight};
    border-radius: 0.8rem;
    transition: background-color 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primaryNormal};
  }
`;

export const EmptyContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

export const LoadingItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3rem 4rem;
  margin: 0 1rem 0 0;
`;
