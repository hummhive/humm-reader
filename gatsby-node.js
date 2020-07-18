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
    component: require.resolve("./src/templates/home"),
    context: { pageContent: indexJSON },
  });

  createPage({
    path: '/subscribe',
    component: require.resolve("./src/templates/subscribe"),
  });

  indexJSON.forEach(element => {
    createPage({
      path: `/story/${element.slug}`,
      component: require.resolve("./src/templates/story"),
      context: {
        pageContent: require(`./content/${element.slug}`),
      },
    });
  });
};
