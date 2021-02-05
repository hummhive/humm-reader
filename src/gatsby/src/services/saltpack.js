import { box, sign } from "tweetnacl"
import * as MP from "@msgpack/msgpack"
import { Encrypt, Decrypt } from "@hummhive/saltpack"
import Stream from "stream-browserify"

export const generateKeySet = () => {
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

export const encrypt = (data, senderKeyPair, recipientPublicKeys) => {
  const dataStream = Stream.Readable.from(data)
  console.log(dataStream)
  const encryptStream = Encrypt(
    {
      publicKey: Uint8Array.from(senderKeyPair.public),
      secretKey: Uint8Array.from(senderKeyPair.secret),
    },
    recipientPublicKeys.map(key => Uint8Array.from(key)),
    false
  )

  dataStream.pipe(encryptStream)
  dataStream.on("end", () => {
    encryptStream.end()
  })

  return "encryptStream"
}

export const decrypt = async (recipientKeyPair, readStream) => {
  const decryptStream = Decrypt({
    publicKey: Uint8Array.from(recipientKeyPair.public),
    secretKey: Uint8Array.from(recipientKeyPair.secret),
  })

  // // Async iterator over messagepack items from the encrypted file.
  // eslint-disable-next-line no-restricted-syntax
  for await (const item of MP.decodeStream(readStream)) {
    decryptStream.write(item)
  }

  return decryptStream
}
