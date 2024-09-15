import { Input } from 'jiponent';
import styled from 'styled-components';
import { inputStyle } from '@/shared/style';

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  min-width: 30rem;
  max-width: 50%;
  margin: 0 auto;
  padding: 0 3rem;
`;

export const CustomInput = styled(Input.Text)`
  ${inputStyle}
`;
