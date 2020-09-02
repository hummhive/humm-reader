import { navigate } from "gatsby"

export const isBrowser = () => typeof window !== "undefined"
export const getJWT = () =>
  isBrowser() && window.localStorage.getItem("jwt")
    ? window.localStorage.getItem("jwt")
    : null

const setJWT = jwt => window.localStorage.setItem("jwt", jwt)

export const handleLogin = jwt => {
  return setJWT(jwt)
}

export const isLoggedIn = () => {
  const jwt = getJWT()
  return !!jwt
}

export const logout = () => {
  window.localStorage.clear()
  return navigate("/")
}
