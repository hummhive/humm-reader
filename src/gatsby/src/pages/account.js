import React, { useState } from "react"
import Layout from "../components/layout"
import { logout, getBillingPortal, getMemberKeys } from "../services/auth"
import { FiLock, FiUnlock } from "react-icons/fi"
import SEO from "../components/seo"

const Account = () => {
  const [showKey, setShowKey] = useState(false)
  return (
    <Layout>
      <SEO title="My Account" />
      <div className="container content">
        <div className="bg-white rounded box-shadow">
          <h5 className="border-bottom border-gray pb-2 mb-0">My Account</h5>
          <div className="media text-muted">
            <div className="row border-bottom border-gray w-100 pt-3 pb-3">
              <div className="col-6">
                <p className="media-body mb-0 small lh-125">
                  <strong className="d-block text-gray-dark">My Key</strong>
                  Make sure to store your key in a safe place.
                </p>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-end">
                <small onClick={() => setShowKey(true)}>
                  {showKey ? (
                    <div className="d-flex align-items-center">
                      <FiUnlock
                        style={{
                          fontSize: "15px",
                          marginRight: "9px",
                          width: "30px",
                        }}
                      />{" "}
                      <span className="text-break">{getMemberKeys()}</span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <FiLock
                        style={{
                          fontSize: "15px",
                          width: "30px",
                        }}
                      />{" "}
                      <span>Click here to unlock your keys</span>
                    </div>
                  )}
                </small>
              </div>
            </div>
          </div>
          {getBillingPortal() && (
            <div className="media text-muted">
              <div className="d-flex align-items-center border-bottom border-gray w-100 pt-3 pb-3">
                <div className="flex-grow-1">
                  <p className="media-body mb-0 small lh-125">
                    <strong className="d-block text-gray-dark">
                      Manage Subscription
                    </strong>
                    Make sure to store your keys in a safe place.
                  </p>
                </div>
                <div>
                  <a href={getBillingPortal()}>Manage my Subscription</a>
                </div>
              </div>
            </div>
          )}
          <div className="media text-muted">
            <div className="d-flex align-items-center border-bottom border-gray w-100 pt-3 pb-3">
              <div className="flex-grow-1">
                <p className="media-body mb-0 small lh-125">
                  <strong className="d-block text-danger">
                    Destroy Session in this Browser
                  </strong>
                  You will need to use your key in order to login once you
                  destroy your session in this browser. <br />
                </p>
              </div>
              <button type="button" className="btn btn-danger" onClick={logout}>
                End Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Account
