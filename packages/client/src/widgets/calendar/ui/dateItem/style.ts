import styled from 'styled-components';

export const DateItem = styled.td`
  flex: 1;
`;

export const DateOfMonth = styled.p<{ $weekday: number }>`
  font-size: 1.5rem;
  padding: 0 1rem;

  color: ${({ $weekday }) => {
    switch ($weekday) {
      case 6:
        return 'blue';
      case 0:
        return 'red';
      default:
        return 'black';
    }
  }};
`;
