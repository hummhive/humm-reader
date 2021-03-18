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

const Layout = ({ children, header }) => {
  return (
    <>
      {header !== "no" && <Header />}
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
}

export default Layout
