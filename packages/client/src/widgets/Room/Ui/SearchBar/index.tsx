import { ChangeEvent } from 'react';
import { Icon, Input } from 'jiponent';
import { useTheme } from 'styled-components';
import * as S from './style';

interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange }: Props) => {
  const theme = useTheme();

  return (
    <S.SearchContainer>
      <Input.Label>
        <Icon
          name='search'
          fill={theme.colors.background}
          color={theme.colors.primaryNormal}
          strokeWidth='4px'
          size='25px'
        />
      </Input.Label>
      <Input.Text
        type='text'
        name='keyword'
        onChange={onChange}
        style={{ padding: '1rem', fontSize: '1.5rem', fontWeight: 600 }}
      />
    </S.SearchContainer>
  );
};

export default SearchBar;
