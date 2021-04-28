import tweetnaclUtil from "tweetnacl-util"
import transformKeysToUint8 from "./transformKeysToUint8"
import encrypt from "./encrypt"
import { getMemberKeys } from "../services/auth"
import decodeMemberKeys from "../services/decodeMemberKeys"

export default async (
  hiveId,
  hiveSigPublicKey,
  hiveEncryptPublicKey,
  addInboxDataEndpoint,
  groupId,
) => {
  try {
    const memberKeys = decodeMemberKeys(getMemberKeys())
    const memberKeysUint8 = transformKeysToUint8(memberKeys)
    const groupData = {
      hive: hiveId,
      group: groupId,
      signingPublicKey: tweetnaclUtil.encodeBase64(
        memberKeysUint8.signing.publicKey
      ),
    }

    const encrypted = await encrypt(
      JSON.stringify(groupData),
      memberKeysUint8.encryption,
      [tweetnaclUtil.decodeBase64(hiveEncryptPublicKey)]
    )

    const res = await fetch(
      `${addInboxDataEndpoint}?hivePublicKey=${encodeURIComponent(
        hiveSigPublicKey
      )}&path=hummhive,groupRequest`,
      {
        method: "POST",
        body: encrypted,
      }
    ).then(res => res.json())

    return { status: res, memberKeys: memberKeys }
  } catch (err) {
    console.log(err.message || JSON.stringify(err), "error")
    throw err
  }
}
