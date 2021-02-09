export default keySet => ({
  signing: {
    publicKey: Uint8Array.from(keySet.encryption.public),
    secretKey: Uint8Array.from(keySet.encryption.secret),
  },
  encryption: {
    publicKey: Uint8Array.from(keySet.encryption.public),
    secretKey: Uint8Array.from(keySet.encryption.secret),
  },
})
