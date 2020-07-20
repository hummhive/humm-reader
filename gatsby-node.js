/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const indexJSON = require("./content/index.json");
const hiveJSON = require("./content/hive-config.json");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  createPage({
    path: '/',
    component: require.resolve("./src/templates/home"),
    context: { pageContent: indexJSON, hive: hiveJSON },
  });

  indexJSON.forEach(element => {
    createPage({
      path: `/story/${element.slug}`,
      component: require.resolve("./src/templates/story"),
      context: {
        pageContent: require(`./content/${element.slug}`),
        hive: hiveJSON,
      },
    });
  });
};
