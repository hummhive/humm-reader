import React from "react"
import PropTypes from "prop-types"
import { Del } from "./styled"

function DelBlock(props) {
  return <Del>{props.children}</Del>
}

DelBlock.propTypes = {
  children: PropTypes.any,
}

export default DelBlock
