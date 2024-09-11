import styled from 'styled-components';

interface Props {
  $width?: string | number;
  $height?: string | number;
}

export const Wrapper = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) =>
    typeof $width === 'number' ? `${$width}px` : $width};
  height: ${({ $height }) =>
    typeof $height === 'number' ? `${$height}px` : $height};
`;
