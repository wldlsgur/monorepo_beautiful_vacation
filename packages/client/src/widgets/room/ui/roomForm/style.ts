import { Input } from 'jiponent';
import styled from 'styled-components';
import { inputStyle } from '@/shared/style';

export const Form = styled.form`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;
  padding: 3rem;
`;

export const Wrapper = styled(Input)`
  gap: 1rem;
`;

export const Text = styled(Input.Text)`
  ${inputStyle}
`;

export const Label = styled(Input.Label)`
  font-size: 1.5rem;
`;

export const ErrorMessage = styled(Input.ErrorMessage)``;
