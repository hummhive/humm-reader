import styled, { keyframes } from 'styled-components';

const spinnerKeyframes = keyframes`
  50% {
    border-radius: 50%;
    transform: scale(0.5) rotate(360deg);
  }
  100% {
    transform: scale(1) rotate(720deg);
  }
`;
const shadowKeyframes = keyframes`
  50% {
    transform: scale(0.5);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Container = styled.div`
  display: ${props => (props.isShowing ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: ${props => (props.inline ? 'inherit' : '100%')};
  position: ${props => (props.fullscreen ? 'fixed' : 'relative')};
  top: ${props => (props.fullscreen ? '0' : 'inherit')};
  right: ${props => (props.fullscreen ? '0' : 'inherit')};
  bottom: ${props => (props.fullscreen ? '0' : 'inherit')};
  left: ${props => (props.fullscreen ? '0' : 'inherit')};
  background: ${props =>
    props.fullscreen ? 'rgba(0,0,0,0.45)' : 'transparent'};
  z-index: 10000;
`;

export const Spinner = styled.div`
  position: relative;
  :before,
  :after {
    content: '';
    position: relative;
    display: block;
  }
  :before {
    animation: ${spinnerKeyframes} 2s cubic-bezier(0.75, 0, 0.5, 1) infinite
      normal;
    width: 75px;
    height: 75px;
    background-color: ${props => props.theme.secondaryVivid};
    /* box-shadow: 0px 0px 20px rgba(0, 117, 255, 0.5), 0px 0px 5px rgba(0, 59, 127, 0.5); */
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  /* :after {
    animation: ${shadowKeyframes} 2s cubic-bezier(0.75, 0, 0.5, 1) infinite
      normal;
    bottom: -1em;
    height: 0.75em;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
  } */
`;
