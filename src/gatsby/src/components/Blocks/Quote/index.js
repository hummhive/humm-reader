import React from "react"
import PropTypes from "prop-types"
import { Quote } from "./styled"

const QuoteBlock = props => <Quote>{props.children}</Quote>

QuoteBlock.propTypes = {
  children: PropTypes.any,
}

export default QuoteBlock
