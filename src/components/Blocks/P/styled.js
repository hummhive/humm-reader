import styled from 'styled-components';

export const P = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0.15px;
  padding: 0;
  margin: ${props => (props.dense ? '0' : '16px')} 0;
`;

export const Placeholder = styled(P)`
  position: absolute;
  top: 0;
  pointer-events: none;
  color: ${props => props.theme.app300};
`;
