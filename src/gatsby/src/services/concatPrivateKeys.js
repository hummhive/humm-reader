import tweetnaclUtil from "tweetnacl-util"

export default (signingKey, encryptionKey) => {
  const key = tweetnaclUtil.encodeBase64(signingKey.concat(encryptionKey))
  return key
}
