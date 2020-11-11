import { styled } from '../utils/singletonDependencies';

export const Container = styled.div`
  text-align: center;
`;

export const ConnectedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a77fde;
  font-size: 14px;
  border-radius: 8px;
  font-weight: 400;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.03), 0px 3px 15px rgba(0, 0, 0, 0.1);

  strong {
    font-weight: 900;
  }
`;

export const CheckmarkContainer = styled.div`
  padding: 16px;
  border-radius: 8px;
`;
