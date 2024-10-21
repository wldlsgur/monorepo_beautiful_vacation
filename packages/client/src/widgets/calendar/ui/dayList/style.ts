import styled from 'styled-components';

export const DayList = styled.tr`
  display: flex;
  justify-content: space-around;
  padding: 2rem 0rem;
  font-size: 2rem;
`;

export const DayItem = styled.td<{ $day: string }>`
  color: ${({ $day }) => {
    switch ($day) {
      case '토':
        return 'blue';
      case '일':
        return 'red';
      default:
        return 'black';
    }
  }};
`;
