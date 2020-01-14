import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Dropdown = () => {
  // const [visible, setVisible] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      allContentfulProjet(sort: { fields: createdAt, order: DESC }, limit: 12) {
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
      <div className="dropdown dropdown__bg--sm" id="dropdown">
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
        {/* <Link className="dropdown__item dropdown__item--dark">
          <span className="dropdown__item__title">Saint-Jacques</span>
          <span className="dropdown__item__category">archi intérieure</span>
        </Link>
        <Link className="dropdown__item dropdown__item--dark">
          <span className="dropdown__item__title">Saint-Jacques</span>
          <span className="dropdown__item__category">archi intérieure</span>
        </Link>
        <Link className="dropdown__item dropdown__item--dark">
          <span className="dropdown__item__title">Saint-Jacques</span>
          <span className="dropdown__item__category">archi intérieure</span>
        </Link>
        <Link className="dropdown__item dropdown__item--dark">
          <span className="dropdown__item__title">Saint-Jacques</span>
          <span className="dropdown__item__category">archi intérieure</span>
        </Link> */}
      </div>
    </>
  )
}

export default Dropdown
