import React from "react"
import Layout from "../components/layout"
import PropTypes from "prop-types"
import { DocumentContext } from "../context/DocumentContext"
import Moment from "react-moment"
import SEO from "../components/seo"
import { FiClock } from "react-icons/fi"
import DocumentBuilder from "../components/documentBuilder"

const Story = ({ slug }) => {
  const { loading, documents } = React.useContext(DocumentContext)
  const document = documents && documents[slug]

  if (!document) return null

  const body = JSON.parse(document.body)

  return (
    <Layout>
      <SEO title={document.title} />
      <div className="container content">
        <div className="post-title">
          <h1>{document.title}</h1>
        </div>
        <div className="meta d-flex pt-1">
          <div className="date">
            <FiClock /> Date Published:{" "}
            <Moment format="DD/MM/YYYY">{document.createdAt}</Moment>
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
  slug: PropTypes.string,
}

export default Story
