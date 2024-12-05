import styled from 'styled-components';

export const DateItem = styled.td`
  flex: 1;
  padding: 1rem;

  border: 1px solid ${({ theme }) => theme.colors.primaryNormal};
  border-left: none;
  border-bottom: none;
`;

export const DateHeader = styled.header<{
  $weekday: number;
  $isHoliday: boolean;
}>`
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  color: ${({ $weekday, $isHoliday }) => {
    if ($isHoliday) {
      return 'red';
    }

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

export const DateText = styled.p`
  text-align: center;
`;
