import React from "react"
import PropTypes from "prop-types"
import Loader from "../../Loader"
import { useBlob } from "../../../hooks"
import { Image, LoaderContainer } from "./styled"

const ImageBlock = props => {
  const { blob, isLoading, error } = useBlob(props.element.filename)

  if (error)
    return (
      <LoaderContainer>
        <p>error</p>
      </LoaderContainer>
    )

  if (isLoading)
    return (
      <LoaderContainer>
        <Loader size={32} isShowing color="rgba(0, 0, 0, 0.3)" />
      </LoaderContainer>
    )

  const src = props.element.src || blob

  return <Image src={src} />
}

ImageBlock.propTypes = {
  element: PropTypes.object,
}

export default ImageBlock
