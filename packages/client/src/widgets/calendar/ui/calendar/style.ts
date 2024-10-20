import styled from 'styled-components';

export const TableContainer = styled.table`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const TableHeader = styled.thead`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2rem 0;
  background: ${({ theme }) => theme.colors.backgroundLight}; /* 배경색 설정 */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
