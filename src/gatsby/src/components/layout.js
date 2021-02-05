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

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="pt-1 pb-1 mt-5">
        <div className="container">
          Published with the <a href="https://humm.earth">hummHive app</a>. All
          Rights Reserved.
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
