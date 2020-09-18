import { Link } from "gatsby"
import PropTypes from "prop-types"
import { FiHexagon } from "react-icons/fi"
import { FaBookmark } from "react-icons/fa"
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
        {!!hive.connections.stripe && hive.connections.stripe.defaultPlan && (
          <button className="subscribe">
            <Link to="/subscribe">
              <FaBookmark />
              Subscribe to my newsletter
            </Link>
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
