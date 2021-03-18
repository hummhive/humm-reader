import tweetnaclUtil from "tweetnacl-util"

export default (signingKey, encryptionKey) => {
  return tweetnaclUtil.encodeBase64(signingKey.concat(encryptionKey))
}
