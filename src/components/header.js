import { Link } from "gatsby"
import PropTypes from "prop-types"
import { FiHexagon } from "react-icons/fi"
import { FaBookmark } from "react-icons/fa"
import { isLoggedIn, logout } from "../services/auth"
import React from "react"

const Header = ({ hive }) => (
  <div className="wrapper">
    <div className="header">
      <div className="container d-flex p-3">
        <div className="title">
          <Link to="/">
            <FiHexagon />
            {hive.name}
          </Link>
        </div>
        {!isLoggedIn() && process.env.STRIPE_PUBLIC_KEY !== null ? (
          <button className="subscribe">
            <Link to="/subscribe">
              <FaBookmark />
              Subscribe to my newsletter
            </Link>
          </button>
        ) : (
          <button className="subscribe" onClick={logout}>
            Logout
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
