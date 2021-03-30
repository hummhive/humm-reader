import { navigate } from "gatsby"
import decodeMemberKeys from "../services/decodeMemberKeys"
import tweetnaclUtil from "tweetnacl-util"

export const isBrowser = () => typeof window !== "undefined"

export const getMemberKeys = () =>
  isBrowser() && window.localStorage.getItem("member-keys")
    ? window.localStorage.getItem("member-keys")
    : null

export const getBillingPortal = () =>
  isBrowser() && window.localStorage.getItem("paymentBillingPortal")
    ? window.localStorage.getItem("paymentBillingPortal")
    : null

const setMemberKeys = memberKeys =>
  window.localStorage.setItem("member-keys", memberKeys)

export const handleLogin = memberKeys => {
  return setMemberKeys(memberKeys)
}

export const isLoggedIn = () => {
  const memberKeys = getMemberKeys()
  return !!memberKeys
}

export const paymentBillingPortal = async (hivePk, sentTo) => {
  return await fetch(
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
          return data.url
        } else {
          console.log(sentTo)
          return window.open(data.url)
        }
      }
      return null
    })
    .catch(error => {
      console.error("Error:", error)
    })
}

export const login = (hivePk, encryptionPublicKey) => {
  const authedUser = decodeMemberKeys(encryptionPublicKey)
  if (authedUser) {
    localStorage.setItem("member-keys", JSON.stringify(authedUser))
    paymentBillingPortal(hivePk)
    return navigate(`/`, { state: { callback: true } })
  } else {
    return false
  }
}

export const logout = () => {
  localStorage.removeItem("paymentBillingPortal")
  localStorage.removeItem("member-keys")
  localStorage.removeItem("customerFound")
  navigate(`/`, { state: { callback: true } })
}
