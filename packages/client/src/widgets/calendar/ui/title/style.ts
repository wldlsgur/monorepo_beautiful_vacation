import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.primaryLight};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryNormal};
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
`;
