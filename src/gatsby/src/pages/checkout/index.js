import React, { useState } from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { getMemberKeys } from "../../services/auth"
import decodeMemberKeys from "../../services/decodeMemberKeys"
import tweetnaclUtil from "tweetnacl-util"
import PropTypes from "prop-types"
import { HiveContext } from "../../context/HiveContext"
import { loadStripe } from "@stripe/stripe-js"

function Subscribe({
  paymentCapabilityId = "honeyworksCloudStripe",
  activePlan = 0,
  checkoutUrl = "https://stripe-dev.hummhive.workers.dev/market/checkout/session/create",
}) {
  const { hive } = React.useContext(HiveContext)
  const [loading, setLoading] = useState(false)
  const selectedPlan =
    hive && hive.connectionsConfig[paymentCapabilityId].plans[activePlan]
  const decodedMemberKeys = decodeMemberKeys(getMemberKeys())
  const handleClick = async () => {
    setLoading(true)
    fetch(checkoutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        hivePk: hive.signingPublicKey,
        memberPk: tweetnaclUtil.encodeBase64(
          decodedMemberKeys.encryption.public
        ),
        priceId: selectedPlan.id,
      }),
    })
      .then(response => response.json())
      .then(async checkout => {
        const stripePromise = loadStripe(checkout.stripePk, {
          stripeAccount: checkout.account,
        })
        const stripe = await stripePromise
        try {
          await stripe.redirectToCheckout({
            sessionId: checkout.sessionId,
          })
        } catch (e) {
          setLoading(false)
          console.log(e.message)
        }
      })
  }
  if (!hive) return null
  return (
    <Layout>
      <SEO title="Subscribe" />
      <div className="container content">
        <div className="subscription-title">
          Upgrade your subscription in order to enjoy premium content
        </div>
        <div className="subscription-plan">
          <label>
            <input
              name="plan"
              type="radio"
              value={selectedPlan.unitAmount / 100}
              checked
            />
            <span>
              Monthly -{" "}
              <strong>
                US$
                {selectedPlan.unitAmount / 100}
              </strong>
            </span>
          </label>
        </div>
        <button
          type="button"
          className="btn btn-highlight"
          onClick={handleClick}
        >
          {!loading ? "Checkout" : "Loading..."}
        </button>
      </div>
    </Layout>
  )
}
Subscribe.propTypes = {
  location: PropTypes.object,
  hiveConfig: PropTypes.object,
  breadcrumb: PropTypes.object,
  pageContext: PropTypes.object,
  paymentCapabilityId: PropTypes.string,
  activePlan: PropTypes.number,
  checkoutUrl: PropTypes.string,
}
export default Subscribe
