import React from "react"
import { Link } from "gatsby"
import Moment from "react-moment"
import { FiClock } from "react-icons/fi"
import { DocumentContext } from "../context/DocumentContext"
import "./bootstrap.min.css"
import "./layout.css"

const DocumentList = () => {
  const { documents: documentsObj } = React.useContext(DocumentContext)

  const documents =
    documentsObj &&
    Object.keys(documentsObj)
      .map(docSlug => {
        return documentsObj[docSlug]
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="container content">
      {documents ? (
        documents.map((document, index) => {
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
              <div className="entry-footer pt-3"></div>
            </div>
          )
        })
      ) : (
        <div className="text-center mt-5 pt-5">
          <h1>Welcome to Honeyworks Website Creator</h1>
          <p className="lead pt-3">
            It seems like you have not published anything into your website yet.
            In order to get started, try to publish a story as
            "Public" using the Honeyworks Publisher.
          </p>
        </div>
      )}
    </div>
  )
}

export default DocumentList
