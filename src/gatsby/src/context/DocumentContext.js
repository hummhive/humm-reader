import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import decrypt from "../services/decrypt"

// TODO: de-hardcode these
const dataBridgeGetDataUrl = "http://localhost:8787/getData"
const hivePublicKey = "Bejij2geEMQwQRDRR/SArTKlvO8XqKO5zBeu7ZZODTw="

export const DocumentContext = React.createContext({})

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDocuments = async () => {
    setLoading(true)

    const docs = await fetch(dataBridgeGetDataUrl, {
      method: "POST",
      body: JSON.stringify({
        hivePublicKey,
        collectionId: "honeyworksDocuments",
        dataId: "default",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json())

    const memberKeysString = localStorage.getItem("member-keys")

    // if there are no member keys, use the public data
    if (!memberKeysString) setDocuments(docs.public)
    // if there are member keys, try to decrypt the private data
    else {
      const memberKeys = JSON.parse(memberKeysString)
      const keyPair = {
        publicKey: Uint8Array.from(memberKeys.encryption.public),
        secretKey: Uint8Array.from(memberKeys.encryption.secret),
      }

      try {
        const str = await decrypt(keyPair, docs.saltpack)
        setDocuments({ ...JSON.parse(str), ...docs.public })
      } catch (err) {
        // if decryption fails, user is not an active member
        setDocuments(docs.public)
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  return (
    <DocumentContext.Provider value={{ loading, documents }}>
      {children}
    </DocumentContext.Provider>
  )
}

DocumentProvider.propTypes = {
  children: PropTypes.any,
}
