/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const indexJSON = require("./content/index.json");

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  createPage({
    path: '/',
    component: require.resolve("./src/templates/IndexTemplate"),
    context: { pageContent: indexJSON },
  });
  
  indexJSON.forEach(element => {
    createPage({
      path: element.slug,
      component: require.resolve("./src/templates/DocumentTemplate"),
      context: {
        pageContent: require(`./content/${element.slug}`),
      },
    });
  });
};