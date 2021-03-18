import DecryptWorker from "../workers/decrypt.worker.js"
const decryptWorker = typeof window === "object" && new DecryptWorker()

export default async (recipientKeyPair, data) => {
  const res = await decryptWorker.decrypt({ recipientKeyPair, data })
  return res
}
