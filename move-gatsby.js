if (process.env.NETLIFY) process.exit(1)

const fs = require("fs")
const path = require("path")

const startPath = path.resolve(__dirname, "src", "gatsby")
const endPath = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "honeyworks-reader-gatsby"
)

const deleteFolderRecursive = function (pathToDel) {
  if (fs.existsSync(pathToDel)) {
    fs.readdirSync(pathToDel).forEach(file => {
      const curPath = path.join(pathToDel, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(pathToDel)
  }
}

deleteFolderRecursive(endPath)

fs.renameSync(startPath, endPath)
fs.copyFileSync(
  path.resolve(__dirname, "package.json"),
  path.resolve(endPath, "package.json")
)
const pkg = require(path.resolve(endPath, "package.json"))
delete pkg.scripts.postinstall
fs.writeFileSync(path.resolve(endPath, "package.json"), JSON.stringify(pkg))
