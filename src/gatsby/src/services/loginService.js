import { box, sign } from "tweetnacl"
import tweetnaclUtil from "tweetnacl-util"

export default base64KeyPair => {
  try {
    const decodeStream = tweetnaclUtil.decodeBase64(base64KeyPair)
    const signingKeys = sign.keyPair.fromSecretKey(decodeStream.slice(0, 64))
    const encryptionKeys = box.keyPair.fromSecretKey(decodeStream.slice(64, 98))

    return {
      signing: {
        public: Array.from(signingKeys.publicKey),
        secret: Array.from(signingKeys.secretKey),
      },
      encryption: {
        public: Array.from(encryptionKeys.publicKey),
        secret: Array.from(encryptionKeys.secretKey),
      },
    }
  } catch (error) {
    return false
  }
}
