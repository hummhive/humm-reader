import React from "react"
import { Router } from "@reach/router"
import PropTypes from "prop-types"
import Layout from "./components/layout"
import DocumentList from "./components/documentList"
import DefaultNoHive from "./components/defaultNoHive"
import { useStaticQuery, graphql } from "gatsby"

const Home = () => {
  const { coreDataJson: coreData } = useStaticQuery(graphql`
    query {
      coreDataJson {
        hivePublicKey
      }
    }
  `)
  return (
    <Layout header={!coreData.hivePublicKey && "no"}>
      <Router>
        {!coreData.hivePublicKey ? (
          <DefaultNoHive path="/" />
        ) : (
          <DocumentList path="/" />
        )}
      </Router>
    </Layout>
  )
}

Home.propTypes = {
  pageContext: PropTypes.object,
}

export default Home
