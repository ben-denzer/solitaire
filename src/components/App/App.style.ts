import styled from 'styled-components';
import { bgColor } from 'styles/colors';

export const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${bgColor};
`;
