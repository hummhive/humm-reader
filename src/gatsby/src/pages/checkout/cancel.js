import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

function SubscribeCancel() {
  return (
    <Layout>
      <SEO title="Subscribe" />
      <div className="container content">
        <div className="subscription-title">
          You have decided not to subscribe!
        </div>
        <div className="subscription-plan">
          You can come back any time and sign up whenever you feel like it!
        </div>
      </div>
    </Layout>
  )
}

export default SubscribeCancel
