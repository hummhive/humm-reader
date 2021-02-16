import React from "react"
import Layout from "../components/layout"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import SEO from "../components/seo"
import * as queryString from "query-string"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { loadStripe } from "@stripe/stripe-js"

function Subscribe({ pageContext, location }) {
  const { breadcrumb } = pageContext
  const { subscribed } = queryString.parse(location.search)
  const paymentData = {}
  // const paymentData = useStaticQuery(graphql`
  //   query {
  //     capabilitiesJson {
  //       paymentPlans {
  //         id
  //         unitAmount
  //         provider
  //       }
  //     }
  //     hiveJson {
  //       signingPublicKey
  //     }
  //   }
  // `)
  const handleClick = async () => {
    fetch("https://humm-stripe-dev.hummhive.workers.dev/checkout/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        publicKey: "paymentData.hiveJson.signingPublicKey",
        priceId: "paymentData.capabilitiesJson.paymentPlans.id",
      }),
    })
      .then(response => response.json())
      .then(async checkout => {
        // 2. With Stripe Connect Worker's response, init Stripe
        // and run Stripe Checkout
        const stripePromise = loadStripe(checkout.stripePk, {
          stripeAccount: checkout.account,
        })
        const stripe = await stripePromise
        // 3. Run Stripe Checkout
        try {
          await stripe
            .redirectToCheckout({
              sessionId: checkout.sessionId,
            })
            .then(console.log)
          // After the subscription signup succeeds, the customer is returned to your website at the success_url and a checkout.session.completed event is sent. You can check for this event in the Dashboard or with a webhook endpoint and the Stripe CLI.
        } catch (e) {
          alert(e.message)
          console.log(e)
        }
      })
  }
  return (
    <Layout>
      <SEO title="Subscribe" />
      {/* <Breadcrumb
        crumbs={breadcrumb.crumbs}
        crumbSeparator=" / "
        crumbLabel="Subscribe"
      /> */}
      {!subscribed ? (
        <div className="container content">
          <div className="subscription-title">
            Chose a subscription plan and support my content
          </div>
          <div className="subscription-plan">
            <label>
              <input
                name="plan"
                type="radio"
                value={"paymentData.capabilitiesJson.paymentPlans.unitAmount"}
                checked
              />
              <span>
                Monthly -{" "}
                <strong>
                  US$
                  {"paymentData.capabilitiesJson.paymentPlans.unitAmount"}
                </strong>
              </span>
            </label>
          </div>
          <button onClick={handleClick}>Pay</button>
        </div>
      ) : (
        <div className="container content">
          <div className="subscription-title">
            You have subscribed succesfully!
          </div>
          <div className="subscription-plan">
            You will be receveing an email shortly with structions about how to
            login
          </div>
        </div>
      )}
    </Layout>
  )
}
Subscribe.propTypes = {
  location: PropTypes.object,
  hiveConfig: PropTypes.object,
  breadcrumb: PropTypes.object,
  pageContext: PropTypes.object,
}
export default Subscribe
