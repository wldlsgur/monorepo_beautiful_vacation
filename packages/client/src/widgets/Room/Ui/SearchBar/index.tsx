import { Icon, Input } from 'jiponent';
import { useTheme } from 'styled-components';
import * as S from './style';

const SearchBar = () => {
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
      <Input.Text style={{ padding: '1rem' }} />
    </S.SearchContainer>
  );
};

export default SearchBar;
