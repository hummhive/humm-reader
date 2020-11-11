/* eslint-disable no-param-reassign */
import React from "react"
import PropTypes from "prop-types"
import A from "./A"
import Code from "./Code"
import U from "./U"
import EM from "./EM"
import Strong from "./Strong"

function Leafs({ attributes, children, leaf }) {
  if (leaf.bold) children = <Strong>{children}</Strong>
  if (leaf.italic) children = <EM>{children}</EM>
  if (leaf.underlined) children = <U>{children}</U>
  if (leaf.code) children = <Code>{children}</Code>
  if (leaf.link) children = <A {...leaf}>{children}</A>

  return <span {...attributes}>{children}</span>
}

Leafs.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.any,
  leaf: PropTypes.object,
}

export default Leafs
