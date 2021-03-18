import { Encrypt } from "@hummhive/saltpack"
import { Readable } from "readable-stream"

export default async (dataString, senderKeyPair, recipientPublicKeys) => {
  const encryptedChunks = []
  const dataStream = new Readable()

  dataStream._read = () => {}
  dataStream.push(dataString)
  dataStream.push(null)

  await new Promise(resolve => {
    const encryptStream = Encrypt(senderKeyPair, recipientPublicKeys, false)

    encryptStream.on("data", chunk => {
      encryptedChunks.push(chunk)
    })

    dataStream.pipe(encryptStream)
    dataStream.on("end", () => {
      encryptStream.end()
      resolve()
    })
  })

  const encryptedData = Buffer.concat(encryptedChunks)

  return encryptedData
}
