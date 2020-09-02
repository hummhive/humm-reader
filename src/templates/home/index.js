import React from "react"
import Layout from "../../components/layout"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import PropTypes from "prop-types"
import SEO from "../../components/seo"
import DocumentList from "../../components/documentList"

const Home = ({ pageContext }) => {
  const { breadcrumb } = pageContext
  return (
    <Layout>
      <SEO title="Home" />
      <Breadcrumb
        crumbs={breadcrumb.crumbs}
        crumbSeparator=" / "
        crumbLabel="Home"
      />
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
