import React from "react"
import { Link } from "gatsby"
import Moment from "react-moment"
import { FiChevronRight, FiClock } from "react-icons/fi"
import { DocumentContext } from "../context/DocumentContext"
import "./bootstrap.min.css"
import "./layout.css"

const DocumentList = () => {
  const { loading, documents } = React.useContext(DocumentContext)

  return (
    <div className="container content">
      {loading && (
        <div className="loading-indicator">Fetching new content...</div>
      )}
      {documents &&
        Object.keys(documents).map((docSlug, index) => {
          const document = documents[docSlug]
          const summaryBlock = JSON.parse(document.body).find(
            e => e.type === "p" && e.children[0].text !== ""
          )
          const summary = (summaryBlock && summaryBlock.children[0].text) || ""

          return (
            <div key={document.slug} className="post">
              <div className="post-title" key={`content_item_${index}`}>
                <h1>
                  <Link to={`/story/${document.slug}`}>{document.title}</Link>
                </h1>
              </div>
              <div className="meta d-flex pt-1">
                <div className="date">
                  <FiClock /> Date Published:{" "}
                  <Moment format="DD/MM/YYYY">{document.createdAt}</Moment>
                </div>
              </div>
              <div className="summary pt-3">
                {summary.length > 350
                  ? summary.substr(0, 350 - 1) + "..."
                  : summary}
              </div>
              <div className="entry-footer pt-3">
                <Link className="read-more" to={`/story/${document.slug}`}>
                  Read More <FiChevronRight />
                </Link>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default DocumentList
