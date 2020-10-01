/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import "./bootstrap.min.css"
import "./layout.css"
const hiveJSON = require("../../content/hive-config.json")

const Layout = ({ children }) => {
  return (
    <>
      <Header hive={hiveJSON} />
      <main>{children}</main>
      <footer className="container">
        {hiveJSON.name} was created using the{" "}
        <a href="https://humm.earth">hummHive app</a>. <br />
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
