import { navigate } from "gatsby"
import loginService from "../services/loginService"
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

export const paymentBillingPortal = hivePk => {
  return fetch(
    "https://stripe-dev.hummhive.workers.dev/market/customer-portal",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hivePk,
        memberPk: tweetnaclUtil.encodeBase64(
          JSON.parse(getMemberKeys()).encryption.public
        ),
      }),
    }
  )
    .then(response => response.json())
    .then(data => {
      window.localStorage.setItem("paymentBillingPortal", data && data.url)
    })
    .catch(error => {
      console.error("Error:", error)
    })
}

export const login = (hivePk, encryptionPublicKey) => {
  const authedUser = loginService(encryptionPublicKey)
  if (authedUser) {
    localStorage.setItem("member-keys", JSON.stringify(authedUser))
    paymentBillingPortal(hivePk)
    return navigate(`/`, { state: { callback: true } })
  } else {
    return false
  }
}

export const logout = () => {
  localStorage.removeItem("member-keys")
  localStorage.removeItem("paymentBillingPortal")
  navigate(`/`, { state: { callback: true } })
}
