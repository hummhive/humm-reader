import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import addMember from "../services/addMember"
import Layout from "../components/layout"
import SEO from "../components/seo"

// Uint8Array.prototype._isBuffer = true

function Join() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const hiveData = useStaticQuery(graphql`
    query {
      hiveJson {
        id
        signingPublicKey
        encryptionPublicKey
      }
    }
  `)
  const handleSubmit = async e => {
    e.preventDefault()

    await addMember(
      // hiveData.hiveJson.id,
      // hiveData.hiveJson.encryptionPublicKey,
      "1611697100985-b023d9e6f86aa6dc",
      "aCpubkx7SxDO108ltFVXIcfiJUpWfpld0lN+NdfBe3s=",
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
