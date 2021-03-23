import React from "react"
import Layout from "../../components/layout"
import { paymentBillingPortal } from "../../services/auth"
import { HiveContext } from "../../context/HiveContext"
import PropTypes from "prop-types"
import SEO from "../../components/seo"
import * as queryString from "query-string"

function SubscribeSuccess({ location }) {
  const { session_id } = queryString.parse(location.search)
  const { hive } = React.useContext(HiveContext)
  if (session_id) {
    paymentBillingPortal(hive && hive.signingPublicKey)
  }
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

SubscribeSuccess.propTypes = {
  location: PropTypes.object,
}

export default SubscribeSuccess
