import React from "react"
import PropTypes from "prop-types"
import { OL } from "./styled"

const OLBlock = props => <OL>{props.children}</OL>

OLBlock.propTypes = {
  children: PropTypes.any,
}

export default OLBlock
