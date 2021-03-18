import React from "react"
import { FiHexagon } from "react-icons/fi"
import "./bootstrap.min.css"
import "./layout.css"

const DefaultNoHive = () => {
  return (
    <div className="container d-flex w-100 min-vh-100">
      <div className="d-flex flex-column flex-grow-1 mt-5 text-center align-items-center mt-5 pt-5 ">
        <FiHexagon className="rotate hexagon-splash" />
        <h2 className="mt-5">
          Your <span className="highlight">Hive</span> is Being Created...{" "}
          <br />
          Soon you will be able to share your stories with others!
        </h2>
        <br />
        <p className="p-5">Come back to this page in a minute or less!</p>
      </div>
    </div>
  )
}

export default DefaultNoHive
