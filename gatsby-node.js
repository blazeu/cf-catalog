const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const circleTemplate = path.resolve(`src/templates/Circle/index.js`)
    resolve(
      graphql(`
        {
          allCatalogYaml {
            edges {
              node {
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allCatalogYaml.edges.forEach(({ node }) => {
          const slug = node.slug
          createPage({
            path: slug,
            component: circleTemplate,
            context: {
              slug,
            },
          })
        })
      })
    )
  })
}
