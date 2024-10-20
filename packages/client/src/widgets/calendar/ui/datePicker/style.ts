import styled from 'styled-components';

export const DateInput = styled.input`
  font-size: 1.5rem;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryNormal};
    outline: none;
  }
`;
