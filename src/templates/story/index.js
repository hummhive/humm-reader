import React from "react"
import Layout from "../../components/layout"
import PropTypes from "prop-types"
import Moment from "react-moment"
import { isLoggedIn } from "../../services/auth"
import SEO from "../../components/seo"
import { FiClock } from "react-icons/fi"
import DocumentBuilder from "../../components/documentBuilder"

const Story = ({ pageContext, id }) => {
  const { pageContent } = pageContext
  const staticContent = !isLoggedIn() && pageContent
  const dynamicContent = JSON.parse(
    typeof window !== "undefined" && window.localStorage.getItem("data")
  )
  const theContent = isLoggedIn()
    ? dynamicContent.find(article => id === article.slug)
    : staticContent
  const body = JSON.parse(theContent.body)
  return (
    <Layout>
      <SEO title={theContent.title} />
      <div className="container content">
        <div className="post-title">
          <h1>{theContent.title}</h1>
        </div>
        <div className="meta d-flex pt-1">
          <div className="date">
            <FiClock /> Date Published:{" "}
            <Moment format="DD/MM/YYYY">{theContent.createdAt}</Moment>
          </div>
        </div>
        {body.map((element, i) => (
          <DocumentBuilder key={i} element={element} />
        ))}
      </div>
    </Layout>
  )
}

Story.propTypes = {
  pageContext: PropTypes.object,
  location: PropTypes.object,
  id: PropTypes.string,
}

export default Story
