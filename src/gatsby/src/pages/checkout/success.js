import React, { useEffect } from "react"
import Layout from "../../components/layout"
import { paymentBillingPortal } from "../../services/auth"
import { HiveContext } from "../../context/HiveContext"
import PropTypes from "prop-types"
import SEO from "../../components/seo"

function SubscribeSuccess() {
  const { hive } = React.useContext(HiveContext)

  useEffect(() => {
    paymentBillingPortal(hive && hive.signingPublicKey)
  }, [hive])

  return (
    <Layout>
      <SEO title="Subscribe" />
      <div className="container content">
        <div className="subscription-title">
          You have subscribed succesfully!
        </div>
        <div className="subscription-plan">
          Your subscription should be now approved.
        </div>
      </div>
    </Layout>
  )
}

export default SubscribeSuccess
