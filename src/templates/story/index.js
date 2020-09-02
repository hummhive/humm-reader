import React from "react"
import Layout from "../../components/layout"
import PropTypes from "prop-types"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import { isLoggedIn } from "../../services/auth"
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
      <Breadcrumb
        crumbs={breadcrumb}
        crumbSeparator=" / "
        crumbLabel={theContent.title}
      />
      <DocumentContainer>
        <TitleContainer>
          <h1>{theContent.title}</h1>
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
