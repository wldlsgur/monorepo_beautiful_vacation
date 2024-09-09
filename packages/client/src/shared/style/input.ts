import { css } from 'styled-components';

export const inputStyle = css`
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryDark} !important;
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;
