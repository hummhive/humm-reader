import { Decrypt } from "@hummhive/saltpack"
import * as MP from "@msgpack/msgpack"
import { Readable } from "readable-stream"

export default async (recipientKeyPair, data) => {
  const chunks = []
  const readStream = new Readable()
  readStream._read = () => {} // redundant? see update below
  readStream.push(Buffer.from(data))
  readStream.push(null)
  const decryptStream = Decrypt(recipientKeyPair)

  // // Async iterator over messagepack items from the encrypted file.
  // eslint-disable-next-line no-restricted-syntax
  for await (const item of MP.decodeStream(readStream)) {
    decryptStream.write(item)
  }

  return new Promise(resolve => {
    decryptStream.on("data", chunk => {
      chunks.push(Buffer.from(Array.from(chunk)))
    })
    decryptStream.on("end", () => {
      const buffer = Buffer.concat(chunks)
      const string = new TextDecoder().decode(buffer)
      resolve(string)
    })
  })
}
