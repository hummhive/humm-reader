import React from "react"
import PropTypes from "prop-types"
import Loader from "../../Loader"
import { useBlob } from "../../../hooks"
import { Image, Container } from "./styled"

const path = require("path")

const ImageBlock = props => {
  const extension = path.extname(props.element.filename)
  const filename = path.basename(props.element.filename, extension)
  const variantname = `${filename}-large${extension}`

  const { blob, isLoading, error } = useBlob(variantname)

  const [height, setHeight] = React.useState(null)
  const ref = React.useRef(null)

  React.useEffect(() => {
    const handleResize = () => {
      if (!props.element.aspectRatio) return
      setHeight(ref.current.offsetWidth / props.element.aspectRatio)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [ref.current])

  const src = props.element.src || blob

  return (
    <Container ref={ref} height={height}>
      {(error && <p>{error}</p>) ||
        (isLoading && (
          <Loader size={48} isShowing color="rgba(0, 0, 0, 0.3)" />
        )) || <Image src={src} />}
    </Container>
  )
}

ImageBlock.propTypes = {
  element: PropTypes.object,
}

export default ImageBlock
