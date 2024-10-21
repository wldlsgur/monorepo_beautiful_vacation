import React from 'react';
import * as S from './style';

const dayList = ['일', '월', '화', '수', '목', '금', '토'];

const DayList = () => {
  return (
    <S.DayList>
      {dayList.map((day) => (
        <S.DayItem
          key={day}
          $day={day}
        >
          {day}
        </S.DayItem>
      ))}
    </S.DayList>
  );
};

export default React.memo(DayList);
