import tweetnaclUtil from "tweetnacl-util"
import Loadable from "@loadable/component"
import decodeMemberKeys from "../services/decodeMemberKeys"

const LoadablePaymentBillingPortal = async (hivePk, sentTo) => {
  const result = await fetch(
    "https://stripe-dev.hummhive.workers.dev/market/customer-portal",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hivePk,
        memberPk: tweetnaclUtil.encodeBase64(
          decodeMemberKeys(getMemberKeys()).encryption.public
        ),
      }),
    }
  )
    .then(response => response.json())
    .then(data => {
      if (data.error === "Customer not found" && !data.url) {
        window.localStorage.setItem("customerFound", false)
      } else if (data.error !== "Customer not found" && !data.url) {
        window.localStorage.setItem("customerFound", true)
      } else if (data.url) {
        window.localStorage.setItem("paymentBillingPortal", true)
        if (!sentTo) {
          return true
        } else {
          return window.open(data.url)
        }
      } else {
        window.localStorage.setItem("customerFound", false)
      }
      return null
    })
    .catch(error => {
      console.error("Error:", error)
    })
  return result
}

const paymentBillingPortal = Loadable(() =>
  import("./LoadablePaymentBillingPortal")
)

export default paymentBillingPortal
