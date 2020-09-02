import React from "react"
import PropTypes from "prop-types"
import { H4 } from "./styled"

const H4Block = props => <H4>{props.children}</H4>

H4Block.propTypes = {
  children: PropTypes.any,
}

export default H4Block
