import styled from 'styled-components';

export const RoomList = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 3rem 3rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 1rem;
    padding: 0;
    margin: 0;
    border: none;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 50%;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primaryLight};
    border-radius: 0.5rem;
    transition: all 1s;
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