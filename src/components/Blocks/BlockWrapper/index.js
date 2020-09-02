import React from "react"
import PropTypes from "prop-types"
import { Container, BlockContainer } from "./styled"

function BlockWrapper({ attributes, element, children }) {
  const blockLayout = element.layout || "inset"

  return (
    <Container {...attributes} blockLayout={blockLayout}>
      <BlockContainer id="block-container">{children}</BlockContainer>
    </Container>
  )
}

BlockWrapper.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.object,
  children: PropTypes.any,
}

export default BlockWrapper
