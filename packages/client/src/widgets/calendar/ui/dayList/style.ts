import styled from 'styled-components';

export const DayList = styled.tr`
  display: flex;
  justify-content: space-around;
  font-size: 2rem;
`;

export const DayItem = styled.td<{ $day: string }>`
  width: 100%;
  height: 100%;
  padding: 2rem 0rem;
  text-align: center;

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
