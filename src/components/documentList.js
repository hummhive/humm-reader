import React from "react"
import { isLoggedIn } from "../services/auth"
import { Link } from "gatsby"
import "./bootstrap.min.css"
import "./layout.css"

const DocumentList = () => {
  const staticContent = require("../../content/index.json")
  const dynamicContent = JSON.parse(
    typeof window !== "undefined" && window.localStorage.getItem("data")
  )
  const pageContent =
    isLoggedIn() && dynamicContent ? dynamicContent : staticContent
  return (
    <>
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
            <div className="date">{data.date}</div>
          </div>
        </div>
      ))}
    </>
  )
}

export default DocumentList
