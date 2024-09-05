import styled from 'styled-components';

export const RoomList = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding: 1rem;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 0.8rem;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
