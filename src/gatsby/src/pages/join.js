import React, { useState } from "react"
import PropTypes from "prop-types"
import { HiveContext } from "../context/HiveContext"
import addMember from "../services/addMember"
import Layout from "../components/layout"
import SEO from "../components/seo"

function Join() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const { hive } = React.useContext(HiveContext)

  if (!hive) return null

  const handleSubmit = async e => {
    e.preventDefault()

    await addMember(
      hive.id,
      hive.signingPublicKey,
      hive.encryptionPublicKey,
      username,
      email
    )
  }
  return (
    <Layout>
      <SEO title="Home" />
      <div className="container content center margin">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                // type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </Layout>
  )
}
Join.propTypes = {
  location: PropTypes.object,
}
export default Join
