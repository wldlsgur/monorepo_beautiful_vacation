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
      <Input.Label id={id}>
        <Icon
          name='search'
          fill={theme.colors.background}
          color={theme.colors.primaryNormal}
          strokeWidth='4px'
          size='25px'
        />
      </Input.Label>
      <Input.Text
        id={id}
        name='keyword'
        onChange={onChange}
        style={{
          padding: '1rem',
          fontSize: '1.5rem',
          fontWeight: 600,
        }}
        borderColor={theme.colors.primaryNormal}
      />
    </S.SearchContainer>
  );
};

export default SearchBar;
