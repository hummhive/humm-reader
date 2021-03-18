import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import decrypt from "../services/decrypt"
import { globalHistory } from '@reach/router'
import { useStaticQuery, graphql } from "gatsby"

export const DocumentContext = React.createContext({})

export const DocumentProvider = ({ children }) => {
  const { coreDataJson: coreData } = useStaticQuery(graphql`
    query {
      coreDataJson {
        hivePublicKey
        getDataEndpoint
      }
    }
  `)

  const [documents, setDocuments] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDocuments = async () => {
    setLoading(true)

    const publicDocs = await fetch(
      `${coreData.getDataEndpoint}?hivePublicKey=${coreData.hivePublicKey}&collectionId=honeyworks&dataId=allPublicDocuments`,
      { method: "GET" }
    ).then(async res => {
      if (!res.ok) {
        const err = await res.json()
        console.error(err)
        return []
      }
      const buffer = await res.arrayBuffer()
      const string = new TextDecoder().decode(buffer)

      return (string && JSON.parse(string)) || []
    })

    let privateDocs = {}
    const memberKeysString = localStorage.getItem("member-keys")

    if (memberKeysString) {
      privateDocs = await fetch(
        `${coreData.getDataEndpoint}?hivePublicKey=${coreData.hivePublicKey}&collectionId=honeyworks&dataId=allPrivateDocuments`,
        { method: "GET" }
      ).then(async res => {
        if (!res.ok) {
          const err = await res.json()
          console.error(err)
          return []
        }
        const buffer = await res.arrayBuffer()

        if (buffer.byteLength === 0) return []

        const memberKeys = JSON.parse(memberKeysString)
        const keyPair = {
          publicKey: Uint8Array.from(memberKeys.encryption.public),
          secretKey: Uint8Array.from(memberKeys.encryption.secret),
        }

        try {
          const decryptedBuffer = await decrypt(keyPair, buffer)
          const str = new TextDecoder().decode(decryptedBuffer)

          return JSON.parse(str)
        } catch (err) {
          // if decryption fails, user is not an active member
          return []
        }
      })
    }

    setDocuments({ ...privateDocs, ...publicDocs })

    setLoading(false)
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  useEffect(() => {
  return globalHistory.listen(({ action }) => {
    if (action === 'PUSH') fetchDocuments()
  })
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
