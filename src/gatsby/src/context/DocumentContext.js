import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import decrypt from "../services/decrypt"

// TODO: de-hardcode these
const dataBridgeGetDataUrl = "http://localhost:8787/getData"
const documentSchemaSHA512 =
  "cbcca280c633b2f2887ff0b1eb641b1eeb70d4c4d3103189315dece36217d4e7ac9bf7e4cca7fbb6766d0a9f9814a8c3a9e33065d2e9a664257a28b7b97cb8a1"
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
        collectionId: documentSchemaSHA512,
        dataId: "honeyworksDocuments",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json())

    const memberKeysString = localStorage.getItem("member-keys")
    if (memberKeysString) {
      const memberKeys = JSON.parse(memberKeysString)
      const keyPair = {
        publicKey: Uint8Array.from(memberKeys.encryption.public),
        secretKey: Uint8Array.from(memberKeys.encryption.secret),
      }
      try {
        const str = await decrypt(keyPair, docs.saltpack)
        setDocuments(JSON.parse(str))
      } catch (err) {
        // if decryption fails, user is not an active member
        setDocuments(docs.public)
      }
    } else setDocuments(docs.public)

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
