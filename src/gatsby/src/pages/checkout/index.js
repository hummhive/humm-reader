import React, { useState } from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { getMemberKeys } from "../../services/auth"
import decodeMemberKeys from "../../services/decodeMemberKeys"
import tweetnaclUtil from "tweetnacl-util"
import PropTypes from "prop-types"
import { HiveContext } from "../../context/HiveContext"
import { GroupsContext } from "../../context/GroupsContext"
import { loadStripe } from "@stripe/stripe-js"

function Subscribe({
  paymentCapabilityId = "honeyworksCloudStripe",
  activePlan = 0,
  checkoutUrl = "https://stripe-dev.hummhive.workers.dev/market/checkout/session/create",
}) {
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  const [loading, setLoading] = useState(false)
  const { hive } = React.useContext(HiveContext)
  const { groups } = React.useContext(GroupsContext)

  const plans = groups?.filter(g => g.paymentPluginData.some(p => p.pluginId === paymentCapabilityId))
    .map(g => {
      const stripePlanData = g.paymentPluginData.find(p => p.pluginId === paymentCapabilityId)
      return {
        ...g,
        ...stripePlanData,
      }
    })
  const decodedMemberKeys = decodeMemberKeys(getMemberKeys())

  const handleSubmit = async () => {
    setLoading(true)
    fetch(checkoutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        hivePk: hive.signingPublicKey,
        memberPk: tweetnaclUtil.encodeBase64(
          decodedMemberKeys.signing.public
        ),
        priceId: selectedPlanId,
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
        {plans?.map(plan => (
          <div key={plan.planId} className="subscription-plan">
            <label>
              <input
                name="plan"
                type="radio"
                value={plan.planId}
                checked={selectedPlanId === plan.planId}
                onChange={() => setSelectedPlanId(plan.planId)}
              />
              <span>
                {plan.name} -{" "}
                Monthly -{" "}
                <strong>
                  $
                  {(plan.amount / 100).toFixed(2)}
                </strong>
              </span>
            </label>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-highlight"
          onClick={handleSubmit}
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
