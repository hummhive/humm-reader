import React, { useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import api from "./api";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link } from "gatsby"

export default function CheckoutForm() {
   const [amount, setAmount] = useState(0);
   const [currency, setCurrency] = useState("");
   const [clientSecret, setClientSecret] = useState(null);
   const [error, setError] = useState(null);
   const [metadata, setMetadata] = useState(null);
   const [succeeded, setSucceeded] = useState(false);
   const [processing, setProcessing] = useState(false);
   const stripe = useStripe();
   const elements = useElements();

   useEffect(() => {
    // Step 1: Fetch product details such as amount and currency from
    // API to make sure it can't be tampered with in the client.
    api.getProductDetails().then((productDetails) => {
      setAmount(productDetails.amount / 100);
      setCurrency(productDetails.currency);
    });

    // Step 2: Create PaymentIntent over Stripe API
    api
      .createPaymentIntent()
      .then((clientSecret) => {
        setClientSecret(clientSecret);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

   const handleSubmit = async (ev) => {
     ev.preventDefault();
     setProcessing(true);

     // Step 3: Use clientSecret from PaymentIntent and the CardElement
     // to confirm payment with stripe.confirmCardPayment()
     const payload = await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
         card: elements.getElement(CardElement),
         billing_details: {
           name: ev.target.name.value,
         },
       },
     });

     if (payload.error) {
       setError(`Payment failed: ${payload.error.message}`);
       setProcessing(false);
       console.log("[error]", payload.error);
     } else {
       setError(null);
       setSucceeded(true);
       setProcessing(false);
       setMetadata(payload.paymentIntent);
       console.log("[PaymentIntent]", payload.paymentIntent);
     }
   };

   const renderSuccess = () => {
     return (
       <div className="sr-field-success message">
         <h1>Payment succeeded!</h1>
         <pre className="sr-callout">
           <code>{JSON.stringify(metadata, null, 2)}</code>
         </pre>
       </div>
     );
   };

   const renderForm = () => {
     const options = {
       style: {
         base: {
           color: "#32325d",
           fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
           fontSmoothing: "antialiased",
           fontSize: "16px",
           "::placeholder": {
             color: "#aab7c4",
           },
         },
         invalid: {
           color: "#fa755a",
           iconColor: "#fa755a",
         },
       },
     };

  return (
    <form onSubmit={handleSubmit}>
          <div className="subscription-title">Chose a subscription plan and support the Rolf's Newsletter</div>
          <div className="subscription-plan">
            <label><input name="plan" type="radio" value="yearly120usd" checked="" />
      <span>Free Plan</span>
                </label>
        <label><input name="plan" type="radio" value="yearly120usd" checked="" />
  <span>Basic Plan - <strong>US$40</strong></span>
            </label>
            <label><input name="plan" type="radio" value="yearly120usd" checked="" />
  <span>Premium Plan - <strong>US$120</strong></span>
  </label>
            </div>
      <div className="sr-combo-inputs">
        <div className="sr-combo-inputs-row">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="cardholder"
            className="sr-input"
          />
        </div>

        <div className="sr-combo-inputs-row">
          <CardElement
            className="sr-input sr-card-element"
            options={options}
          />
        </div>
      </div>

      {error && <div className="message sr-field-error">{error}</div>}

      <button
        className="btn-payment"
        disabled={processing || !clientSecret || !stripe}
      >
        {processing ? "Processing…" : "Pay"}
      </button>
    </form>
  );
};
  return (
          <div className="checkout-form">
            <div className="sr-payment-form">
              <div className="sr-form-row" />
              {succeeded ? renderSuccess() : renderForm()}
            </div>
          </div>
  );
}
