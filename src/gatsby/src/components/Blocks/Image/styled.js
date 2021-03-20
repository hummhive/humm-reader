import styled from "styled-components"

export const Image = styled.img`
  width: 100%;
  height: auto;
  outline: solid 0px ${props => props.theme.secondaryVivid};
  outline-width: ${props => (props.isFocused ? "4px" : "0px")};
  transition: border-width 100ms linear;
  margin: 16px 0;
  min-height: 100px;
  background: ${props => props.theme.rowDivider};
  cursor: default;
`

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background: rgba(0, 0, 0, 0.06);
  margin: 16px 0;
  outline: solid 0px ${props => props.theme.secondaryVivid};
  outline-width: ${props => (props.isFocused ? "4px" : "0px")};

  p {
    margin: 0;
    font-weight: 600;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.3em;
  }
`
