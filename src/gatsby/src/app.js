import React from "react"
import { Router } from "@reach/router"
import PropTypes from "prop-types"
import { HiveContext } from "./context/HiveContext"
import Layout from "./components/layout"
import DocumentList from "./components/documentList"
import DefaultNoHive from "./components/defaultNoHive"

const Home = () => {
  const { hive } = React.useContext(HiveContext)
  // TODO: display loader while loading the hive?
  return (
    <Layout header={!hive && "no"}>
      <Router>
        {!hive ? <DefaultNoHive path="/" /> : <DocumentList path="/" />}
      </Router>
    </Layout>
  )
}

Home.propTypes = {
  pageContext: PropTypes.object,
}

export default Home
