import { Link } from "gatsby"
import PropTypes from "prop-types"
import { isLoggedIn, logout, getBillingPortal } from "../services/auth"
import { HiveContext } from "../context/HiveContext"
import { FiHexagon } from "react-icons/fi"
import React from "react"

const Header = () => {
  const { hive } = React.useContext(HiveContext)
  return (
    <div className="wrapper">
      <div className="header mt-3">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="logo highlight" to="/">
              <FiHexagon /> {(hive && hive.name) || ""}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse d-flex" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
                <li className="nav-item">
                  {!isLoggedIn() && <Link to="/join">Join Hive</Link>}
                </li>
                <li className="nav-item">
                  {!isLoggedIn() && (
                    <Link className="btn btn-highlight" to="/login">
                      Sign in
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {isLoggedIn() && !getBillingPortal() && (
                    <Link className="btn btn-highlight" to="/checkout">
                      Subscribe
                    </Link>
                  )}
                  {isLoggedIn() && getBillingPortal() && (
                    <a
                      href={window.localStorage.getItem("paymentBillingPortal")}
                      className="btn btn-highlight"
                    >
                      Account
                    </a>
                  )}
                </li>
                <li className="nav-item">
                  {isLoggedIn() && (
                    <Link to="/" onClick={logout}>
                      Logout
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

Header.propTypes = {
  hive: PropTypes.object,
}

export default Header
