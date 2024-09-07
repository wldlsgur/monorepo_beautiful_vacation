import { Tap } from 'jiponent';
import styled from 'styled-components';

export const HomeTap = styled(Tap)`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  & > div {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const HomeTapItem = styled(Tap.Item)`
  flex: 1 0 10rem;
  padding: 1rem;
  font-weight: 600;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  border-radius: 0.5rem;
`;
