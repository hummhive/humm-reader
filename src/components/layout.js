/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Header from "./header"
import { FiHexagon } from "react-icons/fi"
import "./bootstrap.min.css"
import "./layout.css"
const hiveJSON = require("../../content/hive-config.json")

const Layout = ({ children }) => {
  return (
    <>
      <Header hive={hiveJSON} />
      <main>{children}</main>
      <footer className="pt-5 pb-5 mt-5">
        <div className="container">
          <div className="title pb-2 mb-3">
            <Link to="/">
              <FiHexagon />
              {hiveJSON.name}
            </Link>
          </div>
          Published with the <a href="https://humm.earth">hummHive app</a>.{" "}
          <br />
          All Rights Reserved.
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
