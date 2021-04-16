import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import decrypt from "../services/decrypt"
import { getMemberKeys } from "../services/auth"
import decodeMemberKeys from "../services/decodeMemberKeys"
import { useStaticQuery, graphql } from "gatsby"

export const StoryContext = React.createContext({})

export const StoryProvider = ({ children }) => {
  const { coreDataJson: coreData } = useStaticQuery(graphql`
    query {
      coreDataJson {
        hivePublicKey
        getDataEndpoint
      }
    }
  `)

  const addStory = (id, story) => {
    setStories({ ...stories, [id]: story })
  }

  const [stories, setStories] = useState({})
  const [loading, setLoading] = useState(false)

  const getStory = async (id) => {
    if (stories[id]) return stories[id]

    fetchStory(id)
  }
    
  const fetchStory = async (id) => {
    setLoading(true)

    const maybeEncryptedStoryBuffer = await fetch(
      `${coreData.getDataEndpoint}?hivePublicKey=${encodeURIComponent(
        coreData.hivePublicKey
      )}&path=honeyworks,story,${id}`,
      { method: "GET" }
    ).then(async res => {
      if (!res.ok) {
        return []
      }
      const buffer = await res.arrayBuffer()
      return buffer;
    })

    // if JSON.parse works, then content is not encrypted
    try {
      const string = new TextDecoder().decode(maybeEncryptedStoryBuffer)
      const story = JSON.parse(string)
      addStory(id, story)
    } catch (err) {
      // try to decrypt
      const memberKeys = decodeMemberKeys(getMemberKeys())
  
      if (memberKeys) {
        const keyPair = {
          publicKey: Uint8Array.from(memberKeys.encryption.public),
          secretKey: Uint8Array.from(memberKeys.encryption.secret),
        }

        try {
          const buffer = Buffer.from(maybeEncryptedStoryBuffer)
          const decryptedBuffer = await decrypt(keyPair, buffer)
          const str = new TextDecoder().decode(decryptedBuffer)
          const story = JSON.parse(str);

          addStory(id, story)
        } catch (err) {
          // if decryption fails, user is not an active member
          addStory(id, null)
        }
      } else addStory(id, null)
    }

    setLoading(false)
  }

  return (
    <StoryContext.Provider value={{ loading, stories, getStory }}>
      {children}
    </StoryContext.Provider>
  )
}

StoryProvider.propTypes = {
  children: PropTypes.any,
}
