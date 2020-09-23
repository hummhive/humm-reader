import React from "react"
import { navigate } from "gatsby"
import PropTypes from "prop-types"
import * as queryString from "query-string"
import { handleLogin, isLoggedIn } from "../services/auth"
import { fetchContent } from "../services/fetch"
import Layout from "../components/layout"
import SEO from "../components/seo"

class Login extends React.Component {
  state = {
    authed: false,
    dataReady: false,
    jwt: "",
  }

  async componentDidMount() {
    const { jwt } = queryString.parse(this.props.location.search)
    if (jwt) {
      handleLogin(jwt)
      this.setState({
        authed: true,
      })
      await fetchContent(jwt)
      this.setState({
        dataReady: true,
      })
    } else {
      this.setState({
        authed: false,
        dataReady: false,
        jwt: null,
      })
    }
  }
  render() {
    if (this.state.dataReady) {
      setTimeout(() => {
        navigate(`/`)
      }, 3000)
    } else if (isLoggedIn()) {
      navigate(`/`)
    }

    const { jwt } = queryString.parse(this.props.location.search)
    return (
      <Layout>
        <SEO title="Home" />
        <div className="container content center margin">
          {!jwt ? (
            <span>Invalid Request</span>
          ) : !this.state.authed ? (
            <span>Authenticating...</span>
          ) : !this.state.authed || !this.state.dataReady ? (
            <span>Downloading Private Data...</span>
          ) : (
            <span>
              Done!... now you will be redirected back to the home page!
            </span>
          )}
        </div>
      </Layout>
    )
  }
}
Login.propTypes = {
  location: PropTypes.object,
}
export default Login
