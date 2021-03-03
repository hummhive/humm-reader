import React from "react"
import { FiHexagon } from "react-icons/fi"
import "./bootstrap.min.css"
import "./layout.css"

const defaultNoHive = () => {
  !window.localStorage.getItem("cached-hive") && setTimeout(function() { window.location.reload(false)},10000)
  return (
    <div className="container d-flex w-100 min-vh-100">
      <div className="d-flex flex-column flex-grow-1 mt-5 text-center align-items-center mt-5 pt-5 ">
      <FiHexagon className="rotate hexagon-splash" />
        <h2 className="mt-5">
          Your <span className="highlight">Hive</span> is Being Created... <br />
        Soon you will be able to share your stories with others!
        </h2>
        <br />
        <p className="p-5">Just stay here and the page will auto-update once it's ready!</p>
    </div>
  </div>
  )
}

export default defaultNoHive
