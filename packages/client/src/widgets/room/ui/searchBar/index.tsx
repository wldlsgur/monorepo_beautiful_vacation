import { ChangeEvent, useId } from 'react';
import { Icon, Input } from 'jiponent';
import debounce from 'lodash/debounce';
import { useTheme } from 'styled-components';
import * as S from './style';

interface Props {
  onChange: (keyword: string) => void;
}

const SearchBar = ({ onChange = () => {} }: Props) => {
  const id = useId();
  const theme = useTheme();

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    onChange(value);
  };

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
        onChange={debounce(handleChangeKeyword, 400)}
        borderColor={theme.colors.primaryNormal}
      />
    </S.SearchContainer>
  );
};

export default SearchBar;
