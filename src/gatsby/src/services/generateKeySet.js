import { box, sign } from "tweetnacl"

export default () => {
  const signingKeys = sign.keyPair()
  const encryptionKeys = box.keyPair()

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
}
