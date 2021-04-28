import { Link } from "gatsby"
import PropTypes from "prop-types"
import { isLoggedIn, customerFound } from "../services/auth"
import { HiveContext } from "../context/HiveContext"
import { GroupsContext } from "../context/GroupsContext"
import { FiHexagon } from "react-icons/fi"
import React from "react"

const Header = () => {
  const { hive } = React.useContext(HiveContext)
  const { groups } = React.useContext(GroupsContext)
  const hasStripePlans = groups?.some(g => g.paymentPluginData.some(p => p.pluginId === 'honeyworksCloudStripe'));
  // const checkPaymentGateway =
  //   hive && hive.connectionsConfig.honeyworksCloudStripe

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
                {!isLoggedIn() && (
                  <li className="nav-item">
                    <Link to="/join">Join Hive</Link>
                  </li>
                )}
                {!isLoggedIn() && (
                  <li className="nav-item">
                    <Link className="btn btn-highlight" to="/login">
                      Access
                    </Link>
                  </li>
                )}
                {isLoggedIn() && hasStripePlans && !customerFound() && (
                  <li className="nav-item">
                    <Link className="btn btn-highlight" to="/checkout">
                      Subscribe
                    </Link>
                  </li>
                )}
                {isLoggedIn() && (
                  <li className="nav-item">
                    <Link
                      className={customerFound() || hasStripePlans ? "btn" : "btn btn-highlight"}
                      to="/account"
                    >
                      My Account
                    </Link>
                  </li>
                )}
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
  location: PropTypes.object,
}

export default Header
