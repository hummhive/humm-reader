import React, { useRef, useState } from 'react';
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import generatePrivateKeys from "../services/generatePrivateKeys"
import { Link } from "gatsby"
import { FiHexagon, FiCopy } from "react-icons/fi"
import { isLoggedIn } from "../services/auth"
import { useStaticQuery, graphql } from "gatsby"
import { HiveContext } from "../context/HiveContext"
import addMember from "../services/addMember"
import Layout from "../components/layout"
import SEO from "../components/seo"

function Join() {
  const { coreDataJson: coreData } = useStaticQuery(graphql`
    query {
      coreDataJson {
        addInboxDataEndpoint
      }
    }
  `)
  const [username, setUsername] = useState("")
  const [joinedSuccess, setJoinedSuccess] = useState(false)
  const [memberKeys, setMemberKeys] = useState("")
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const [email, setEmail] = useState("")
  const { hive } = React.useContext(HiveContext)

  if (!hive) return null

  function copyToClipboard(e) {
  textAreaRef.current.select();
  document.execCommand('copy');
  e.target.focus();
  setCopySuccess('Copied!');
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const response = await addMember(
      hive.id,
      hive.signingPublicKey,
      hive.encryptionPublicKey,
      coreData.addInboxDataEndpoint,
      username,
      email
    )

    if(response.status === "Success"){
      setJoinedSuccess(true);
      setMemberKeys(generatePrivateKeys(response.memberKeys.signing.secret, response.memberKeys.encryption.secret))
    }
  }
  if (
    !joinedSuccess &&
    isLoggedIn() ||
    JSON.parse(
      typeof window !== "undefined" && window.localStorage.getItem("data")
    )
  ) {
    navigate(`/`)
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
                  Join{" "}
                  <span className="highlight">
                    {(hive && hive.name) || ""}
                    {"'s"}
                  </span>{" "}
                  Hive
                </h2>
                {!joinedSuccess && (
                <>
                <p className="login-subtitle">
                  Already a member? <Link to="/login">Login</Link>
                </p>
                <div className="mb-3">
                  <input
                    type="email"
                    className="login-form-shadow"
                    placeholder="Email address"
                    id="exampleInputEmail1"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="login-form-shadow"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    aria-describedby="emailHelp"
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-highlight d-grid gap-2 w-50 mt-2"
                  value="Join Hive"
                />
              </>
              )}
              {joinedSuccess && (
            <>
            <p className="login-subtitle">
              You have succesfully signed up, please store the keys of below in a safe place as you will need them in order to login with your account.
            </p>
            <div className="d-flex flex-row mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
              ></label>
              <input
                type="text"
                className="login-form-shadow"
                id="memberKeys"
                value={memberKeys}
                aria-describedby="emailHelp"
              />
            <div><FiCopy className="copyKey" /><span style={{fontSize: "10px", textAlign: "center"}}>COPY</span></div>
            </div>
            <Link className="btn btn-highlight d-grid gap-2 w-50 mt-2" to="/">Continue</Link>
            </>
            )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
Join.propTypes = {
  location: PropTypes.object,
}
export default Join
