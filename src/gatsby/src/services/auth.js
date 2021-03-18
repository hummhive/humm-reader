import { navigate } from "gatsby"
import loginService from "../services/loginService"

export const isBrowser = () => typeof window !== "undefined"
export const getMemberKeys = () =>
  isBrowser() && window.localStorage.getItem("member-keys")
    ? window.localStorage.getItem("member-keys")
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

export const login = encryptionPublicKey => {
  const authedUser = loginService(encryptionPublicKey)
  if (authedUser) {
    localStorage.setItem("member-keys", JSON.stringify(authedUser))
    return navigate(`/`, { state: { callback: true } })
  } else {
    return false
  }
}

export const logout = () => {
  localStorage.removeItem("member-keys")
  navigate(`/`, { state: { callback: true } })
}
