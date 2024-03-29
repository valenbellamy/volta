import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Dropdown = ({ className }) => {
  const classname = className || ""
  const data = useStaticQuery(graphql`
    query {
      allContentfulProjet(
        filter: { archive: { eq: false } }
        sort: { fields: createdAt, order: DESC }
        limit: 21
      ) {
        edges {
          node {
            id
            titre
            catgorie
            slug
          }
        }
      }
    }
  `)

  return (
    <>
      <div
        className={`dropdown dropdown__bg--lg dropdown--project ${classname}`}
        id="dropdown"
      >
        {data.allContentfulProjet.edges.map((edge, i) => (
          <Link
            key={edge.node.id}
            to={`/${edge.node.slug}`}
            className="dropdown__item dropdown__item--dark"
          >
            <span className="dropdown__item__title">{edge.node.titre}</span>
            <span className="dropdown__item__category">
              {edge.node.catgorie}
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Dropdown
