/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { FaPlusCircle } from 'react-icons/fa';
//import "./bootstrap.min.css";
//import "./layout.css"
const Layout = ({ children, hive }) => {
  return (
    <>
      <Header hive={hive} />
      <main>{children}</main>
      <footer className="container">
        {hive.name} is Powered by the Humm Reader <br />
      <a className="start-creating" href="https://humm.earth"><FaPlusCircle /> Start Creating</a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
