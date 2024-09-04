import { ChangeEvent, useId } from 'react';
import { Icon, Input } from 'jiponent';
import { useTheme } from 'styled-components';
import * as S from './style';

interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange }: Props) => {
  const theme = useTheme();
  const id = useId();

  return (
    <S.SearchContainer>
      <Input.Label htmlFor={id}>
        <Icon
          name='search'
          fill={theme.colors.background}
          color={theme.colors.primaryNormal}
          strokeWidth='3px'
          size='25px'
        />
      </Input.Label>
      <S.CustomInput
        id={id}
        name='keyword'
        onChange={onChange}
        borderColor={theme.colors.primaryNormal}
      />
    </S.SearchContainer>
  );
};

export default SearchBar;
