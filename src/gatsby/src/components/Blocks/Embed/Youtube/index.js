import React from "react"
import PropTypes from "prop-types"
import { EmbedContianer, VideoContianer } from "./styled"

const Embed = ({ data, isFocused }) => {
  const { url } = data

  return (
    <EmbedContianer contentEditable={false} isFocused={isFocused}>
      <VideoContianer>
        <iframe
          title="Embeded Youtube Video"
          src={url}
          width="100%"
          height="100%"
        />
      </VideoContianer>
    </EmbedContianer>
  )
}

Embed.propTypes = {
  data: PropTypes.object,
  isFocused: PropTypes.bool,
}

export default Embed
