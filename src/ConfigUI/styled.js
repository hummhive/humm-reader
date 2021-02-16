import styled from 'styled-components';

export const Container = styled.div`

`;

export const ConnectedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #a77fde;
  font-size: 14px;
  border-radius: 8px;
  font-weight: 400;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.03), 0px 0px 15px rgba(0, 0, 0, 0.05);
  padding: 16px;

  strong {
    font-weight: 900;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CheckmarkContainer = styled.div`
  margin-right: 16px;
`;

export const Label = styled.p`
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  font-weight: 600;
  margin: 8px 0;
`;

export const Text = styled.p`
  color: rgba(0, 0, 0, 0.7);
  font-size: 12px;
  font-weight: 400;
  margin: 8px 0;
`;

export const Spacer = styled.div`
  height: ${props => props.height || 8}px;
`;
