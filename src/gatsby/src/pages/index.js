import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { HiveContext } from "../context/HiveContext"
import DocumentList from "../components/documentList"
import { useMember } from '../hooks'

const Home = () => {
  const { hive } = React.useContext(HiveContext)
  // TODO: use this to determine if member request is pending or not
  const { member } = useMember()

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
