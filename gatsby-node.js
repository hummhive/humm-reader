/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const indexJSON = require("./src/gatsby/content/index.json")

exports.onCreateBabelConfig = ({ actions }) => {
  if (process.env.NODE_ENV !== "development") {
    actions.setBabelPlugin({
      name: "@babel/plugin-transform-regenerator",
      options: {},
    })
    actions.setBabelPlugin({
      name: "@babel/plugin-transform-runtime",
      options: {},
    })
  }
}

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: "/",
    component: require.resolve("./src/gatsby/src/templates/home"),
  })

  indexJSON.forEach(element => {
    createPage({
      path: `/story/${element.slug}`,
      component: require.resolve("./src/gatsby/src/templates/story"),
      context: {
        pageContent: require(`./src/gatsby/content/${element.slug}`),
      },
    })
  })
}
