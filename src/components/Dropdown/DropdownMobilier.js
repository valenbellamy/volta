import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const DropdownMobilier = ({ className }) => {
  const classname = className || ""
  const data = useStaticQuery(graphql`
    query {
      allContentfulMobilier(
        sort: { fields: createdAt, order: DESC }
        limit: 21
      ) {
        edges {
          node {
            id
            titre
            slug
          }
        }
      }
    }
  `)

  return (
    <>
      <div
        className={`dropdown dropdown__bg--lg dropdown--mobilier ${classname}`}
        id="dropdown mobilier"
      >
        {data.allContentfulMobilier.edges.map((edge, i) => (
          <Link
            key={edge.node.id}
            to={`/${edge.node.slug}`}
            className="dropdown__item dropdown__item--dark"
          >
            <span className="dropdown__item__title">{edge.node.titre}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default DropdownMobilier
