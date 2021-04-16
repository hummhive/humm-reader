import React from "react"
import Layout from "../components/layout"
import PropTypes from "prop-types"
import { StoryContext } from "../context/StoryContext"
import Moment from "react-moment"
import SEO from "../components/seo"
import { FiClock } from "react-icons/fi"
import DocumentBuilder from "../components/documentBuilder"

const Story = ({ slug }) => {
  const { loading, stories, getStory } = React.useContext(StoryContext)
  const story = stories[slug]

  React.useEffect(() => {
    getStory(slug)
  }, [])

  if (loading) return 'Loading...'
  if (story === null) return 'Story not found'
  if (!story) return null

  const body = JSON.parse(story.body)

  return (
    <Layout>
      <SEO title={story.title} />
      <div className="container content">
        <div className="post-title">
          <h1>{story.title}</h1>
        </div>
        <div className="meta d-flex pt-1">
          <div className="date">
            <FiClock /> Date Published:{" "}
            <Moment format="DD/MM/YYYY">{story.createdAt}</Moment>
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
