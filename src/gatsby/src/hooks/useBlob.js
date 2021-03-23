import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import decrypt from "../services/decrypt"

export default function useBlob(filename) {
  const { coreDataJson: coreData } = useStaticQuery(graphql`
    query {
      coreDataJson {
        hivePublicKey
        getDataEndpoint
      }
    }
  `)
  const [blob, setBlob] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function get() {
    setIsLoading(true)

    await fetch(
      `${coreData.getDataEndpoint}?hivePublicKey=${encodeURIComponent(
        coreData.hivePublicKey
      )}&path=blob,${filename}`,
      { method: "GET", cache: "force-cache" }
    ).then(async res => {
      if (!res.ok) {
        const err = await res.json()
        setError(err)
        return null
      }
      const arrayBuffer = await res.arrayBuffer()
      if (arrayBuffer.byteLength === 0) return null

      const saltpackTestBytes = arrayBuffer.slice(0, 20)
      const saltpackTestString = new TextDecoder().decode(saltpackTestBytes)
      const isSaltpack = saltpackTestString.includes("saltpack")

      if (!isSaltpack) {
        setBlob(URL.createObjectURL(new Blob([arrayBuffer])))
        setIsLoading(false)
        return
      }

      const memberKeysString = localStorage.getItem("member-keys")
      const memberKeys = JSON.parse(memberKeysString)
      const keyPair = {
        publicKey: Uint8Array.from(memberKeys.encryption.public),
        secretKey: Uint8Array.from(memberKeys.encryption.secret),
      }

      try {
        const decryptedBuffer = await decrypt(keyPair, arrayBuffer)
        setBlob(URL.createObjectURL(new Blob([decryptedBuffer])))
      } catch (err) {
        // if decryption fails, user is not an active member
        setError("You are not a member of this hive")
      }

      setIsLoading(false)
    })
  }

  React.useEffect(() => {
    if (filename && !isLoading && !error) get()
  }, [filename])

  return { blob, isLoading, error }
}
