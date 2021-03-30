import React, { useState } from "react"
import Layout from "../../components/layout"
import { paymentBillingPortal } from "../../services/auth"
import { HiveContext } from "../../context/HiveContext"
import SEO from "../../components/seo"

function SubscribeSuccess() {
  const { hive } = React.useContext(HiveContext)
  const [error, setError] = useState(false)
  async function checkBillingPortal(hive) {
    const result = await paymentBillingPortal(hive && hive.signingPublicKey)
    if (!result) {
      setError(
        "There seems to be an error with your billing portal access. Please contact the Hive owner and let them know about the issue!"
      )
      return null
    }
    return result
  }

  checkBillingPortal(hive)

  return (
    <Layout>
      <SEO title="Subscribe" />
      <div className="container content">
        {error && error && (
          <div className="alert alert-secondary" role="alert">
            {error}
          </div>
        )}
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
