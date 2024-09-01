import styled from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  height: 100%;
`;

export const RoomContainer = styled.section`
  flex: 1 0 70%;
  display: flex;
  flex-direction: column;
  border-right: 3px solid ${({ theme }) => theme.colors.primaryLight};
`;

export const Sidebar = styled.aside`
  flex: 1 0 30%;
`;
