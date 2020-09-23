import React from "react"
import { isLoggedIn } from "../services/auth"
import { Link } from "gatsby"
import Moment from "react-moment"
import { fetchContent } from "../services/fetch"
import "./bootstrap.min.css"
import "./layout.css"

const DocumentList = () => {
  const staticContent = require("../../content/index.json")
  const [dynamicContent, setDynamicContent] = React.useState(
    JSON.parse(
      typeof window !== "undefined" && window.localStorage.getItem("data")
    )
  )

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (isLoggedIn()) {
      setLoading(true)
      fetchContent(
        typeof window !== "undefined" && window.localStorage.getItem("jwt")
      ).then(() => {
        setLoading(false)
        setDynamicContent(
          JSON.parse(
            typeof window !== "undefined" && window.localStorage.getItem("data")
          )
        )
      })
    }
  }, [])

  const pageContent =
    isLoggedIn() && dynamicContent ? dynamicContent : staticContent

  return (
    <>
      {loading && (
        <div className="loading-indicator">Fetching new content...</div>
      )}
      {pageContent.map((data, index) => (
        <div key={data.slug} className="post">
          <div className="post-title" key={`content_item_${index}`}>
            <Link
              className="navbar-brand"
              to={`/${isLoggedIn() ? "me/" : ""}story/${data.slug}`}
            >
              {data.title}
            </Link>
          </div>
          <div className="meta d-flex pt-2">
            <div className="date">
              Published Date: <Moment format="YYYY/MM/DD">{data.date}</Moment>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default DocumentList
