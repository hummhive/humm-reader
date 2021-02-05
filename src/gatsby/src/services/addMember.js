import { encrypt, generateKeySet } from "./saltpack"
import tweetnaclUtil from "tweetnacl-util"

export const test_addMember = async (
  hiveId,
  hivePublicKey,
  username,
  email
) => {
  try {
    const memberKeys = generateKeySet()
    const encryptedChunks = []
    await new Promise(resolve => {
      const memberData = JSON.stringify({
        hive: hiveId,
        username,
        signingPublicKey: tweetnaclUtil.encodeBase64(
          Uint8Array.from(memberKeys.signing.public)
        ),
        encryptionPublicKey: tweetnaclUtil.encodeBase64(
          Uint8Array.from(memberKeys.encryption.public)
        ),
        email,
      })
      console.log(memberData)
      const encryptionStream = encrypt(
        memberData,
        Uint8Array.from(memberKeys.encryption.secret),
        [tweetnaclUtil.decodeBase64(hivePublicKey)]
      )
      console.log(encryptionStream)
      encryptionStream.on("data", chunk => {
        encryptedChunks.push(chunk)
      })

      encryptionStream.on("end", () => {
        resolve()
      })
    })
    const buffer = Buffer.concat(encryptedChunks)
    const data = {
      saltpack: Array.from(buffer),
    }

    await fetch(`https://honeyworks-data-bridge.hummhive.workers.dev/addData`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json())
  } catch (err) {
    console.log(err.message || JSON.stringify(err), "error")
  }
}
