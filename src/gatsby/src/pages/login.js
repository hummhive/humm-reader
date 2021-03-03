import React, { useState } from "react"
import PropTypes from "prop-types"
import { navigate, Link } from "gatsby"
import { HiveContext } from "../context/HiveContext"
import { isLoggedIn, login } from "../services/auth"
import { FiHexagon } from "react-icons/fi"
import Layout from "../components/layout"
import SEO from "../components/seo"

function Login() {
  const [encryptionPublicKey, setEncryptionPublicKey] = useState("")
  const [error, setError] = useState(false)
  const { hive } = React.useContext(HiveContext)

  if (!hive) return null

  const handleSubmit = e => {
    e.preventDefault()
    const authedUser = login(encryptionPublicKey)
    if (authedUser) {
      return
    } else {
      setError("Please double-check if your key pair is correct!")
    }
  }

  if (
    isLoggedIn() ||
    JSON.parse(
      typeof window !== "undefined" && window.localStorage.getItem("data")
    )
  ) {
    // navigate(`/`)
  }
  return (
    <Layout header="no">
      <SEO title="Home" />
      <div className="d-flex w-100 min-vh-100 login-page">
        <div className="custombg"></div>
        <div className="d-flex flex-column flex-grow-1 mt-5 text-center align-items-center">
          <div style={{ maxWidth: "500px", width: "100%" }} className="mx-auto">
            <h1>
              <Link className="hiveName" to="/">
                <FiHexagon />
              </Link>
            </h1>
            <div>
              <form onSubmit={handleSubmit}>
                <h2 className="mt-5 pt-5">
                  Sign in to{" "}
                  <span className="highlight">
                    {(hive && hive.name) || ""}
                    {"'s"}
                  </span>{" "}
                  Hive
                </h2>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <p className="login-subtitle">
                  Not a member yet? <Link to="/join">Join this hive</Link>
                </p>
                <div className="mb-3 mt-3">
                  <input
                    type="text"
                    className="login-form-shadow"
                    id="encryptionPublicKey"
                    placeholder="Enter Your Private Key"
                    value={encryptionPublicKey}
                    onChange={e => setEncryptionPublicKey(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-highlight d-grid gap-2 w-50 mt-2"
                  value="Access"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
Login.propTypes = {
  location: PropTypes.object,
}
export default Login
