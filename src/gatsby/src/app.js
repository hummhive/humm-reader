import React from "react"
import { Router } from "@reach/router"
import PropTypes from "prop-types"
import Layout from "./components/layout"
import DocumentList from "./components/documentList"

const Home = () => {
  return (
    <Layout>
      <Router>
        <DocumentList path="/" />
      </Router>
    </Layout>
  )
}

Home.propTypes = {
  pageContext: PropTypes.object,
}

export default Home
