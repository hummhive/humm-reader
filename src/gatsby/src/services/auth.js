import { navigate } from "gatsby"

export const isBrowser = () => typeof window !== "undefined"
export const getMemberKeys = () =>
  isBrowser() && window.localStorage.getItem("memberKeys")
    ? window.localStorage.getItem("memberKeys")
    : null

const setMemberKeys = memberKeys =>
  window.localStorage.setItem("memberKeys", memberKeys)

export const handleLogin = memberKeys => {
  return setMemberKeys(memberKeys)
}

export const isLoggedIn = () => {
  const memberKeys = getMemberKeys()
  return !!memberKeys
}

export const logout = () => {
  window.localStorage.clear()
  return navigate("/")
}
