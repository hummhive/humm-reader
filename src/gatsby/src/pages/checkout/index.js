import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { getMemberKeys } from "../../services/auth"
import tweetnaclUtil from "tweetnacl-util"
import PropTypes from "prop-types"
import { HiveContext } from "../../context/HiveContext"
import { loadStripe } from "@stripe/stripe-js"

function Subscribe({
  paymentCapabilityId = "honeyworksCloudStripe",
  activePlan = 0,
  checkoutUrl = "https://humm-stripe-dev.hummhive.workers.dev/checkout/session/create",
}) {
  const { hive } = React.useContext(HiveContext)
  const selectedPlan =
    hive && hive.connectionsConfig[paymentCapabilityId].plans[activePlan]

  const handleClick = async () => {
    fetch(checkoutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        hivePk: hive && hive.signingPublicKey,
        memberPk: tweetnaclUtil.encodeBase64(
          JSON.parse(getMemberKeys()).encryption.public
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
          Chose a subscription plan and support my content
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
        <button className="btn btn-highlight" onClick={handleClick}>Subscribe</button>
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
