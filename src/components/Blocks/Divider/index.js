import React from "react"
import PropTypes from "prop-types"
import { Divider } from "./styled"

const DividerBlock = props => {
  return <Divider>{props.children}</Divider>
}

DividerBlock.propTypes = {
  children: PropTypes.any,
}

export default DividerBlock
