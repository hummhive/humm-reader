import React from "react"
import PropTypes from "prop-types"
import { H3 } from "./styled"

const H3Block = props => <H3>{props.children}</H3>

H3Block.propTypes = {
  children: PropTypes.any,
}

export default H3Block
