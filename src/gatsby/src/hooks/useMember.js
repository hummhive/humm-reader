import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { getMemberKeys } from "../services/auth"
import decrypt from "../services/decrypt"
import decodeMemberKeys from "../services/decodeMemberKeys"
import { encodeBase64 } from 'tweetnacl-util'

export default function useMember() {
  const { coreDataJson: coreData } = useStaticQuery(graphql`
    query {
      coreDataJson {
        hivePublicKey
        getDataEndpoint
      }
    }
  `)
  const [member, setMember] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function get() {
    setIsLoading(true)

    const memberKeys = decodeMemberKeys(getMemberKeys())

    if (!memberKeys) {
      setIsLoading(false)
      return;
    }
    const b64PubKey = encodeBase64(memberKeys.signing.public)

    await fetch(
      `${coreData.getDataEndpoint}?hivePublicKey=${encodeURIComponent(
        coreData.hivePublicKey
      )}&path=hummhiveMember,${encodeURIComponent(b64PubKey)}`,
    ).then(async res => {
      if (!res.ok) {
        const err = await res.json()
        setError(err)
        return null
      }
      const arrayBuffer = await res.arrayBuffer()
      if (arrayBuffer.byteLength === 0) return null

      const keyPair = {
        publicKey: Uint8Array.from(memberKeys.encryption.public),
        secretKey: Uint8Array.from(memberKeys.encryption.secret),
      }

      try {
        const decryptedBuffer = await decrypt(keyPair, arrayBuffer)
        const str = new TextDecoder().decode(decryptedBuffer)
        const _member = JSON.parse(str);
        setMember(_member)
      } catch (err) {
        // if decryption fails, user is not an active member
        setError("You do not have access to this data")
      }

      setIsLoading(false)
    })
  }

  React.useEffect(() => {
    get()
  }, [])

  return { member, isLoading, error }
}
