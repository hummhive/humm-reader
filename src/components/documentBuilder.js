import React from "react"
import Blocks from "./Blocks"
import Leafs from "./Leafs"

function DocumentBuilder({ element }) {
  if (element.children) {
    return (
      <Blocks element={element}>
        {element.children.map((child, i) => (
          <DocumentBuilder key={i} element={child} />
        ))}
      </Blocks>
    )
  } else {
    return <Leafs leaf={element}>{element.text}</Leafs>
  }
}

export default DocumentBuilder
