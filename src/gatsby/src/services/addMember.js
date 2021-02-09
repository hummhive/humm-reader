import tweetnaclUtil from "tweetnacl-util"
import generateKeySet from "./generateKeySet"
import transformKeysToUint8 from "./transformKeysToUint8"
import encrypt from "./encrypt"
import generateDiscriminator from "./generateDiscriminator"

// TODO: de-hardcode these
const dataBridgeUrl = "http://localhost:8787/addInboxData"
const memberSchemaSHA512 =
  "e043cb112209dd38a46d662fa22b4ef0ad92fd8883c1e173e5bc6b960cdcbc518c64968883faaf141b52b2c490f902d0293dc9945db6c14f10c1bdf509eb2c5c"

export default async (hiveId, hivePublicKey, username, email) => {
  try {
    const memberKeys = generateKeySet()
    const memberKeysUint8 = transformKeysToUint8(memberKeys)
    console.log(memberKeysUint8)
    const memberData = {
      hive: hiveId,
      username: `${username}#${generateDiscriminator()}`,
      signingPublicKey: tweetnaclUtil.encodeBase64(
        memberKeysUint8.signing.publicKey
      ),
      encryptionPublicKey: tweetnaclUtil.encodeBase64(
        memberKeysUint8.encryption.publicKey
      ),
      email,
    }

    const hivePubKey = tweetnaclUtil.decodeBase64(hivePublicKey)
    const saltpack = await encrypt(
      JSON.stringify(memberData),
      memberKeysUint8.encryption,
      [hivePubKey]
    )

    const data = { saltpack }

    await fetch(dataBridgeUrl, {
      method: "POST",
      body: JSON.stringify({
        hivePublicKey,
        collectionId: memberSchemaSHA512,
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.log(err.message || JSON.stringify(err), "error")
    throw err
  }
}
