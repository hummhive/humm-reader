import React from "react"
import Layout from "../../components/layout"
import PropTypes from "prop-types"
import SEO from "../../components/seo"
import DocumentList from "../../components/documentList"

const Home = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="container content">
        <DocumentList />
      </div>
    </Layout>
  )
}

Home.propTypes = {
  pageContext: PropTypes.object,
}

export default Home
