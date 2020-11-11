import React from "react"
import { Router } from "@reach/router"
import PropTypes from "prop-types"
import PrivateRoute from "../components/PrivateRoute"
import Story from "../templates/story"
const Me = ({ pageContext }) => {
  return (
    <Router>
      <PrivateRoute
        path="/me/story/:id"
        component={Story}
        pageContext={pageContext}
      />
    </Router>
  )
}
Me.propTypes = {
  pageContext: PropTypes.object,
}
export default Me
