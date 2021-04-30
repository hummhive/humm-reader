import React, { useState } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import concatPrivateKeys from "../services/concatPrivateKeys"
import { Link } from "gatsby"
import { FiHexagon, FiCopy } from "react-icons/fi"
import { FaEye } from "react-icons/fa"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { isLoggedIn } from "../services/auth"
import { useStaticQuery, graphql } from "gatsby"
import { HiveContext } from "../context/HiveContext"
import { GroupsContext } from "../context/GroupsContext"
import createMemberRequest from "../services/createMemberRequest"
import createGroupRequest from "../services/createGroupRequest"
import { getMemberKeys } from "../services/auth"
import decodeMemberKeys from "../services/decodeMemberKeys"
import tweetnaclUtil from "tweetnacl-util"
import { loadStripe } from "@stripe/stripe-js"
import Layout from "../components/layout"
import SEO from "../components/seo"

import generateKeySet from "../services/generateKeySet"
import transformKeysToUint8 from "../services/transformKeysToUint8"

const paymentCapabilityId = "honeyworksCloudStripe"
const checkoutUrl = "https://stripe-dev.hummhive.workers.dev/market/checkout/session/create"

function Join() {
  const { coreDataJson: coreData } = useStaticQuery(graphql`
    query {
      coreDataJson {
        addInboxDataEndpoint
      }
    }
  `)
  const [username, setUsername] = useState("")
  const [displayCode, setDisplayCode] = useState(false)
  const [joinedSuccess, setJoinedSuccess] = useState(false)
  const [memberKeys, setMemberKeys] = useState("")
  const [copySuccess, setCopySuccess] = useState("COPY")
  const [email, setEmail] = useState("")
  const [selectedGroupId, setSelectedGroupId] = useState(null)

  const { hive } = React.useContext(HiveContext)
  const { groups } = React.useContext(GroupsContext)

  const selectedGroup = groups?.find(g => g.id === selectedGroupId)

  // .filter(g => g.paymentPluginData.some(p => p.pluginId === paymentCapabilityId))
  // const plans = groups?.map(g => {
  //     const stripePlanData = g.paymentPluginData.find(p => p.pluginId === paymentCapabilityId)
  //     return {
  //       ...g,
  //       ...stripePlanData,
  //     }
  //   })

  React.useEffect(() => {
    if (!selectedGroupId && groups) {
      setSelectedGroupId(groups[0].id)
    }
  }, [groups])

  if (!hive) return null

  const handleSubmit = async e => {
    e.preventDefault()

    const memberResponse = await createMemberRequest(
      hive.id,
      hive.signingPublicKey,
      hive.encryptionPublicKey,
      coreData.addInboxDataEndpoint,
      username,
      email
    )

    if (memberResponse.status === "Success") {
      const privateKey = concatPrivateKeys(
        memberResponse.memberKeys.signing.secret,
        memberResponse.memberKeys.encryption.secret
      )
      setMemberKeys(privateKey)
      localStorage.setItem("member-keys", privateKey)

      const groupResponse = await createGroupRequest(
        hive.id,
        hive.signingPublicKey,
        hive.encryptionPublicKey,
        coreData.addInboxDataEndpoint,
        selectedGroup.id,
      )

      if (groupResponse.status === "Success") {
        setJoinedSuccess(true)
      }
    }
  }

  const handleStripe = async (e) => {
    e.preventDefault()

    const stripePlanData = selectedGroup.paymentPluginData.find(p => p.pluginId === paymentCapabilityId)
    const memberKeys = decodeMemberKeys(getMemberKeys())
    const memberKeysUint8 = transformKeysToUint8(memberKeys)

    await fetch(checkoutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        hivePk: hive.signingPublicKey,
        memberPk: tweetnaclUtil.encodeBase64(
          memberKeysUint8.signing.publicKey
        ),
        priceId: stripePlanData.planId,
      }),
    })
    .then(response => response.json())
    .then(async checkout => {
      const stripePromise = loadStripe(checkout.stripePk, {
        stripeAccount: checkout.account,
      })
      const stripe = await stripePromise
      try {
        await stripe.redirectToCheckout({
          sessionId: checkout.sessionId,
        })
      } catch (e) {
        console.log(e.message)
      }
    })
  }

  if (
    (!joinedSuccess && isLoggedIn()) ||
    JSON.parse(
      typeof window !== "undefined" && window.localStorage.getItem("data")
    )
  ) {
    navigate(`/`)
  }

  return (
    <Layout header="no">
      <SEO title="Join Hive" />
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
                    <div className="subscription-title">
                      Upgrade your subscription in order to enjoy premium content
                    </div>
                    {groups?.map(group => (
                      <div key={group.id} className="subscription-plan">
                        <label>
                          <input
                            name="plan"
                            type="radio"
                            value={group.id}
                            checked={selectedGroupId === group.id}
                            onChange={() => setSelectedGroupId(group.id)}
                          />
                          <span>
                            {group.name} -{" "}
                            {group.amount > 0 ? (
                              <>
                                Monthly -{" "}
                                <strong>
                                  $
                                  {(group.amount / 100).toFixed(2)}
                                </strong>
                              </>
                            ) : (
                              <strong>Free</strong>
                            )}
                          </span>
                        </label>
                        <label>
                          {group.descritpion || 'Description...'}
                        </label>
                      </div>
                    ))}
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
                      You have succesfully signed up, please store the keys of
                      below in a safe place as you will need them in order to
                      login with your account.
                    </p>
                    <div className="d-flex flex-row mb-3">
                      <label className="form-label"></label>
                      <input
                        type={displayCode ? "text" : "password"}
                        className="login-form-shadow"
                        id="memberKeys"
                        value={memberKeys}
                      />
                      <div>
                        <span style={{ fontSize: "10px", textAlign: "center" }}>
                          <FaEye
                            className="showKey"
                            onClick={() => setDisplayCode(!displayCode)}
                          />{" "}
                          SHOW
                        </span>
                      </div>
                      <div>
                        <CopyToClipboard
                          text={memberKeys}
                          onCopy={() => setCopySuccess("COPIED")}
                        >
                          <span
                            style={{ fontSize: "10px", textAlign: "center" }}
                          >
                            <FiCopy className="copyKey" /> {copySuccess}
                          </span>
                        </CopyToClipboard>
                      </div>
                    </div>
                    {selectedGroup.amount > 0 ? (
                      <button
                        className="btn btn-highlight d-grid gap-2 w-50 mt-2"
                        onClick={handleStripe}
                      >
                        Continue To Payment
                      </button>
                    ) : (
                      <Link
                        className="btn btn-highlight d-grid gap-2 w-50 mt-2"
                        to="/"
                      >
                        Continue
                      </Link>
                    )}
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
