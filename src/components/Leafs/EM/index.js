import React from "react"
import PropTypes from "prop-types"
import { EM } from "./styled"

function EMBlock(props) {
  return <EM>{props.children}</EM>
}

EMBlock.propTypes = {
  children: PropTypes.any,
}

export default EMBlock
