import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import decrypt from "../services/decrypt"
import { getMemberKeys } from "../services/auth"
import decodeMemberKeys from "../services/decodeMemberKeys"
import tweetnaclUtil from "tweetnacl-util"
import { useStaticQuery, graphql } from "gatsby"

export const StoryIndexContext = React.createContext({})

export const StoryIndexProvider = ({ children }) => {
  const { coreDataJson: coreData } = useStaticQuery(graphql`
    query {
      coreDataJson {
        hivePublicKey
        getDataEndpoint
      }
    }
  `)

  const [storyIndex, setStoryIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchStoryIndex = async () => {
    setLoading(true)

    const encryptedIndex = await fetch(
      `${coreData.getDataEndpoint}?hivePublicKey=${encodeURIComponent(
        coreData.hivePublicKey
      )}&path=honeyworks,story,index`,
      { method: "GET" }
    ).then(async res => {
      if (!res.ok) {
        return []
      }
      const buffer = await res.arrayBuffer()
      const string = new TextDecoder().decode(buffer)

      return (string && JSON.parse(string)) || []
    })

    const memberKeys = decodeMemberKeys(getMemberKeys())

    if (memberKeys) {
      const keyPair = {
        publicKey: Uint8Array.from(memberKeys.encryption.public),
        secretKey: Uint8Array.from(memberKeys.encryption.secret),
      }
      
      const decryptedIndex = []

      for (const i of encryptedIndex) {
        const isEncrypted = typeof i === 'string';
        if (!isEncrypted) decryptedIndex.push(i);
        else {
          try {
            const buffer = tweetnaclUtil.decodeBase64(i);
            const decrypted = await decrypt(keyPair, buffer)
            const string = new TextDecoder().decode(decrypted);
            decryptedIndex.push(JSON.parse(string));
          } catch (err) {
            // not encrypted for this member
          }
        }
      }

      setStoryIndex(decryptedIndex)
    } else {
      setStoryIndex(encryptedIndex.filter(i => !!i.id))
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchStoryIndex()
  }, [])

  return (
    <StoryIndexContext.Provider value={{ loading, storyIndex }}>
      {children}
    </StoryIndexContext.Provider>
  )
}

StoryIndexProvider.propTypes = {
  children: PropTypes.any,
}
