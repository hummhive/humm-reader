import React from "react"
import PropTypes from "prop-types"
import { Image } from "./styled"

const ImageBlock = (props) => {
  const src = `/${props.element.filename}`;

  return <Image src={src} />
}

ImageBlock.propTypes = {
  element: PropTypes.object,
}

export default ImageBlock
