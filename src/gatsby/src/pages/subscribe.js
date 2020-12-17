import React, { useState } from "react"
import Layout from "../components/layout"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import SEO from "../components/seo"
import * as queryString from "query-string"
import PropTypes from "prop-types"
import { loadStripe } from "@stripe/stripe-js"
const hive = require("../../content/hive-config.json")
const stripeOjb = hive.connections && hive.connections.stripe
function Subscribe({ pageContext, location }) {
  const [plan] = useState(stripeOjb && stripeOjb.defaultPlan)
  const stripePromise = loadStripe(stripeOjb && stripeOjb.publicKey)
  if (stripeOjb === undefined && typeof window !== "undefined") {
    window.location = "/"
    return null
  }
  const { breadcrumb } = pageContext
  const { subscribed } = queryString.parse(location.search)
  const handleClick = async () => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise
    await stripe.redirectToCheckout({
      lineItems: [
        {
          price: plan, // Replace with the ID of your price
          quantity: 1,
        },
      ],
      mode: "subscription",
      successUrl: `${location.origin}/subscribe?subscribed=true`,
      cancelUrl: typeof window !== "undefined" ? window.location.href : "",
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  }
  return (
    <Layout>
      <SEO title="Subscribe" />
      <Breadcrumb
        crumbs={breadcrumb.crumbs}
        crumbSeparator=" / "
        crumbLabel="Subscribe"
      />
      {!subscribed ? (
        <div className="container content">
          <div className="subscription-title">
            Chose a subscription plan and support my content
          </div>
          <div className="subscription-plan">
            <label>
              <input name="plan" type="radio" value={plan} checked={plan} />
              <span>
                Monthly -{" "}
                <strong>
                  US$ {stripeOjb && stripeOjb.defaultPlanPrice / 100}
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
  breadcrumb: PropTypes.object,
  pageContext: PropTypes.object,
}
export default Subscribe
