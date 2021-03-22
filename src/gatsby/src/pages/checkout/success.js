import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

function SubscribeSuccess() {
  return (
    <Layout>
      <SEO title="Subscribe" />
      <div className="container content">
        <div className="subscription-title">
          You have subscribed succesfully!
        </div>
        <div className="subscription-plan">
          We will let you know once your subscription is approved!
        </div>
      </div>
    </Layout>
  )
}

export default SubscribeSuccess
