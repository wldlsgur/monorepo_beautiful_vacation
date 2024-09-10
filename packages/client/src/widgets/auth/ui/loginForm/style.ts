import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Form = styled.form`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  padding: 2rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.colors.primaryReverse};
`;

export const OauthLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem 6rem;

  color: ${({ theme }) => theme.colors.textInverse};
  background-color: ${({ theme }) => theme.colors.kakao};
`;
