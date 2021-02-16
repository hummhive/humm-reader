import React from "react"
import { Router } from "@reach/router"
import PropTypes from "prop-types"
import { HiveContext } from "./context/HiveContext"
import Layout from "./components/layout"
import DocumentList from "./components/documentList"

const Home = () => {
  const { hive } = React.useContext(HiveContext)

  // TODO: display loader while loading the hive?
  if (!hive) return null

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
