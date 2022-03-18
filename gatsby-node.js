const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const projetTemplate = path.resolve("./src/templates/projet.js")
  const mobilierTemplate = path.resolve("./src/templates/mobilier.js")
  const res = await graphql(`
    query {
      allContentfulProjet {
        edges {
          node {
            slug
            titre
          }
        }
      }
      allContentfulMobilier {
        edges {
          node {
            slug
            titre
          }
        }
      }
    }
  `)

  res.data.allContentfulProjet.edges.forEach(edge => {
    createPage({
      component: projetTemplate,
      path: `/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
        titre: edge.node.titre,
      },
    })
  })
  res.data.allContentfulMobilier.edges.forEach(edge => {
    createPage({
      component: mobilierTemplate,
      path: `/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
        titre: edge.node.titre,
      },
    })
  })
}
