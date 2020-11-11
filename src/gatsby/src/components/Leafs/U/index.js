import React from "react"
import PropTypes from "prop-types"
import { U } from "./styled"

function UBlock(props) {
  return <U>{props.children}</U>
}

UBlock.propTypes = {
  children: PropTypes.any,
}

export default UBlock
