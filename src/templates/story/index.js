import React from "react"
import Layout from "../../components/layout"
import PropTypes from "prop-types"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import Moment from "react-moment"
import { isLoggedIn } from "../../services/auth"
import SEO from "../../components/seo"
import DocumentBuilder from "../../components/documentBuilder"
import { DocumentContainer, TitleContainer } from "./styled"

const Story = ({ pageContext, id, location }) => {
  const { pageContent } = pageContext
  const breadcrumb = [
    {
      crumbLabel: "Home",
      pathname: "/",
    },
    {
      crumbLabel: "",
      pathname: location.pathname,
    },
  ]
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
      {console.log(theContent)}
      <Breadcrumb
        crumbs={breadcrumb}
        crumbSeparator=" / "
        crumbLabel={theContent.title}
      />
      <DocumentContainer>
        <TitleContainer>
          <h1>{theContent.title}</h1>
          <div className="meta d-flex pt-2">
            <div className="date">
              Date Published:{" "}
              <Moment format="DD/MM/YYYY">{theContent.publishedA}</Moment>
            </div>
          </div>
        </TitleContainer>
        {body.map((element, i) => (
          <DocumentBuilder key={i} element={element} />
        ))}
      </DocumentContainer>
    </Layout>
  )
}

Story.propTypes = {
  pageContext: PropTypes.object,
  location: PropTypes.object,
  id: PropTypes.string,
}

export default Story
