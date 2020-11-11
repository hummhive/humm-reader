import React from "react"
import PropTypes from "prop-types"
import { H2 } from "./styled"

const H2Block = props => <H2>{props.children}</H2>

H2Block.propTypes = {
  children: PropTypes.any,
}

export default H2Block
