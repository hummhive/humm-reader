const fs = require("fs")
const path = require("path")

const startPath = path.resolve(__dirname, "src", "gatsby")
const endPath = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "hummhive-reader-gatsby"
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
  path.resolve(__dirname, ".babelrc-gatsby"),
  path.resolve(endPath, ".babelrc")
)
fs.copyFileSync(
  path.resolve(__dirname, "gatsby-browser.js"),
  path.resolve(endPath, "gatsby-browser.js")
)
fs.copyFileSync(
  path.resolve(__dirname, "gatsby-config.js"),
  path.resolve(endPath, "gatsby-config.js")
)
fs.copyFileSync(
  path.resolve(__dirname, "gatsby-node.js"),
  path.resolve(endPath, "gatsby-node.js")
)
fs.copyFileSync(
  path.resolve(__dirname, "gatsby-ssr.js"),
  path.resolve(endPath, "gatsby-ssr.js")
)
fs.copyFileSync(
  path.resolve(__dirname, "package.json"),
  path.resolve(endPath, "package.json")
)
const pkg = require(path.resolve(endPath, "package.json"))
delete pkg.scripts.postinstall
fs.writeFileSync(path.resolve(endPath, "package.json"), JSON.stringify(pkg))
