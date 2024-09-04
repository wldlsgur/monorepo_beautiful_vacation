import { Input } from 'jiponent';
import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  min-width: 30rem;
  max-width: 50%;
  margin: 0 auto;
`;

export const CustomInput = styled(Input.Text)`
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
