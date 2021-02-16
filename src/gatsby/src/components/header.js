import { Link } from "gatsby"
import PropTypes from "prop-types"
import { HiveContext } from "../context/HiveContext"
import { isLoggedIn } from "../services/auth"
import { FiHexagon } from "react-icons/fi"
import { FaBookmark, FaLock } from "react-icons/fa"
import React from "react"

const Header = () => {
  const { hive } = React.useContext(HiveContext)

  return (
    <div className="wrapper">
      <div className="header">
        <div className="container d-flex pt-1 pb-1">
          <div className="title">
            <Link to="/">
              <FiHexagon />
              {(hive && hive.name) || ""}
            </Link>
          </div>
          {!isLoggedIn() && (
            <Link to="/subscribe">
              <button className="subscribe">
                <FaBookmark />
                Subscribe to my newsletter
              </button>
            </Link>
          )}
          {isLoggedIn() && (
            <button className="authenticated">
              <FaLock /> Authenticated
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  hive: PropTypes.object,
}

export default Header
