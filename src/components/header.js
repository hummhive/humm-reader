import { Link } from "gatsby"
import PropTypes from "prop-types"
import { FiHexagon } from "react-icons/fi"
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
      </div>
    </div>
  </div>
)

Header.propTypes = {
  hive: PropTypes.object,
}

export default Header
