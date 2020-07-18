import React from "react";
import CheckoutForm from "./CheckoutForm"
import Layout from "../../components/layout"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import SEO from "../../components/seo"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import api from "./api";

const stripePromise = api.getPublicStripeKey().then(key => loadStripe(key));

export default function subscribe({pageContext}) {
    const { pageContent, breadcrumb } = pageContext;
  return (
    <Layout>
      <SEO title="Subscribe" />
      <Breadcrumb crumbs={breadcrumb.crumbs} crumbSeparator=" / " crumbLabel="Subscribe" />
            <div className="container content">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
    </Layout>
  );
}
