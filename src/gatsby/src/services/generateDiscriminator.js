import { randomBytes } from "crypto"

export default () => {
  let code = ""

  do {
    code += randomBytes(3).readUIntBE(0, 3)
  } while (code.length < 4)

  return code.slice(0, 4)
}
