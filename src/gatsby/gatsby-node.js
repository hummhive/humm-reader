/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// const path = require("path")
// const fs = require("fs-extra")
// const hiveConfig = require("./content/hive-config.json")
const indexJSON = require("./content/index.json")

// preserve other hive's build files while also deleting the hive build files
// corresponding to the currently running build
// exports.onPreInit = () => {
//   if (process.argv[2] === "build") {
//     const buildPath = path.join(__dirname, "public", hiveConfig.id)
//     if (fs.existsSync(buildPath)) fs.removeSync(buildPath, { recursive: true })
//     if (fs.existsSync(path.join(__dirname, "public-tmp")))
//       fs.removeSync(path.join(__dirname, "public-tmp"), { recursive: true })

//     fs.mkdirSync(path.join(__dirname, "public-tmp"))

//     if (fs.existsSync(path.join(__dirname, "public")))
//       fs.renameSync(
//         path.join(__dirname, "public"),
//         path.join(__dirname, "public-tmp")
//       )
//   }
// }

// // move the new build files to the temp public folder and then move everything
// // back to the public folder
// exports.onPostBuild = function () {
//   fs.renameSync(
//     path.join(__dirname, "public"),
//     path.join(__dirname, "public-tmp", hiveConfig.id)
//   )
//   fs.mkdirSync(path.join(__dirname, "public"))
//   fs.renameSync(
//     path.join(__dirname, "public-tmp"),
//     path.join(__dirname, "public")
//   )
// }

exports.onCreateBabelConfig = p => {
  if (process.env.NODE_ENV !== "development") {
    p.actions.setBabelPlugin({
      name: "@babel/plugin-transform-regenerator",
      options: {},
    })
    p.actions.setBabelPlugin({
      name: "@babel/plugin-transform-runtime",
      options: {},
    })
  }
}

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: "/",
    component: require.resolve("./src/templates/home"),
  })

  indexJSON.forEach(element => {
    createPage({
      path: `/story/${element.slug}`,
      component: require.resolve("./src/templates/story"),
      context: {
        pageContent: require(`./content/${element.slug}`),
      },
    })
  })
}
