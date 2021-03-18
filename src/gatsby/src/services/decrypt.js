import DecryptWorker from "../workers/decrypt.worker.js"
const decryptWorker = new DecryptWorker()

export default async (recipientKeyPair, data) => {
  const res = await decryptWorker.decrypt({ recipientKeyPair, data })
  return res
}
