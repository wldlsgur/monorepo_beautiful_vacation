import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 3rem;
`;

export const Title = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryNormal};
`;
