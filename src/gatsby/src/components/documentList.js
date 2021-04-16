import React from "react"
import { Link } from "gatsby"
import Moment from "react-moment"
import { FiClock } from "react-icons/fi"
import { StoryIndexContext } from "../context/StoryIndexContext"
import "./bootstrap.min.css"
import "./layout.css"

const DocumentList = () => {
  const { storyIndex } = React.useContext(StoryIndexContext)

  return (
    <div className="container content">
      {storyIndex && storyIndex.length > 0 ? (
        storyIndex.map((story, index) => {
          return (
            <div key={story.slug} className="post">
              <div className="post-title" key={`content_item_${index}`}>
                <h1>
                  <Link to={`/story/${story.id}`}>{story.title}</Link>
                </h1>
              </div>
              <div className="meta d-flex pt-1">
                <div className="date">
                  <FiClock /> Date Published:{" "}
                  <Moment format="DD/MM/YYYY">{story.createdAt}</Moment>
                </div>
              </div>
              <div className="summary pt-3">
                {story.summary?.length > 350
                  ? story.summary.substr(0, 350 - 1) + "..."
                  : story.summary}
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
            In order to get started, try to publish a story as "Public" using
            the Honeyworks Publisher.
          </p>
        </div>
      )}
    </div>
  )
}

export default DocumentList
