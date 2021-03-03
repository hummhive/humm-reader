import tweetnaclUtil from "tweetnacl-util"
import generateKeySet from "./generateKeySet"
import transformKeysToUint8 from "./transformKeysToUint8"
import encrypt from "./encrypt"
import generateDiscriminator from "./generateDiscriminator"

export default async (
  hiveId,
  hiveSigPublicKey,
  hiveEncryptPublicKey,
  addInboxDataEndpoint,
  username,
  email
) => {
  try {
    const memberKeys = generateKeySet()
    const memberKeysUint8 = transformKeysToUint8(memberKeys)

    localStorage.setItem("member-keys", JSON.stringify(memberKeys))

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

    const saltpack = await encrypt(
      JSON.stringify(memberData),
      memberKeysUint8.encryption,
      [tweetnaclUtil.decodeBase64(hiveEncryptPublicKey)]
    )

    const data = { saltpack }

    const response = await fetch(addInboxDataEndpoint, {
      method: "POST",
      body: JSON.stringify({
        hivePublicKey: hiveSigPublicKey,
        collectionId: "hummhiveMember",
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json())

    return {status: response, memberKeys: memberKeys};

  } catch (err) {
    console.log(err.message || JSON.stringify(err), "error")
    throw err
  }
}
