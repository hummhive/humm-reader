import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { HiveContext } from "../context/HiveContext"
import DocumentList from "../components/documentList"

const Home = () => {
  const { hive } = React.useContext(HiveContext)
  if (!hive) return null
  return (
    <Layout>
      <SEO title="Home" />
      <DocumentList />
    </Layout>
  )
}

Home.propTypes = {
  pageContext: PropTypes.object,
}

export default Home
