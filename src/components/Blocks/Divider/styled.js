import styled from 'styled-components';

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: ${props => props.theme.rowDivider};
  margin: 32px 0;
  outline: solid 0px ${props => props.theme.secondaryVivid};
  outline-width: ${props => (props.isFocused ? '2px' : '0px')};
  opacity: ${props => (props.isFocused ? 0.5 : 1)};
`;
