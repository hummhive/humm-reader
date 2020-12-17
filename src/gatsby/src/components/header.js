import { Link } from "gatsby"
import PropTypes from "prop-types"
import { isLoggedIn } from "../services/auth"
import { FiHexagon } from "react-icons/fi"
import { FaBookmark, FaLock } from "react-icons/fa"
import React from "react"

const Header = ({ hive }) => (
  <div className="wrapper">
    <div className="header">
      <div className="container d-flex pt-3 pb-3">
        <div className="title">
          <Link to="/">
            <FiHexagon />
            {hive.name}
          </Link>
        </div>
        {!isLoggedIn() &&
          !!hive.connections &&
          !!hive.connections.stripe &&
          hive.connections.stripe.defaultPlan && (
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

Header.propTypes = {
  hive: PropTypes.object,
}

export default Header
