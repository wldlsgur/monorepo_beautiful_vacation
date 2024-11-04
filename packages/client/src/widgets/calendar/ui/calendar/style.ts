import styled from 'styled-components';

export const CalendarContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2rem 0;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const TableContainer = styled.table`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const TableHeader = styled.thead``;

export const TableBody = styled.tbody`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
