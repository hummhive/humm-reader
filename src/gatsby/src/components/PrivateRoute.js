import React from "react"
import { navigate } from "gatsby"
import PropTypes from "prop-types"
import { isLoggedIn } from "../services/auth"
const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!isLoggedIn()) {
    navigate("/")
    return null
  }
  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.object,
}

export default PrivateRoute
