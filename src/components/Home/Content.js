import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import "./content.scss"

const Content = () => {
  const [index, setIndex] = useState(0)
  const data = useStaticQuery(graphql`
    query {
      img1: file(relativePath: { eq: "photo-6.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img2: file(relativePath: { eq: "photo-1.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img3: file(relativePath: { eq: "photo-8.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img4: file(relativePath: { eq: "photo-9.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img5: file(relativePath: { eq: "photo-5.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const setActiveItem = item => {
    setIndex(item)
  }
  return (
    <main>
      <div className="logo">
        <Link to="/">volta.archi</Link>
      </div>
      <div className="bg-image">
        <div className={`bg-image__wrapper ${index === 0 ? "active" : ""}`}>
          <Img fluid={data.img1.childImageSharp.fluid} />
        </div>
        <div className={`bg-image__wrapper ${index === 1 ? "active" : ""}`}>
          <Img fluid={data.img2.childImageSharp.fluid} />
        </div>
        <div className={`bg-image__wrapper ${index === 2 ? "active" : ""}`}>
          <Img fluid={data.img3.childImageSharp.fluid} />
        </div>
        <div className={`bg-image__wrapper ${index === 3 ? "active" : ""}`}>
          <Img fluid={data.img4.childImageSharp.fluid} />
        </div>
        <div className={`bg-image__wrapper ${index === 4 ? "active" : ""}`}>
          <Img fluid={data.img5.childImageSharp.fluid} />
        </div>
        <div className="bg"></div>
      </div>
      <nav className="navbar navbar--fixed">
        <ul className="navbar__nav">
          <li className="navbar__link navbar__link--dropdown">
            réalisations
            <div className="dropdown" id="dropdown">
              <Link
                to="#"
                className="dropdown__item"
                onMouseEnter={() => setActiveItem(0)}
              >
                <span className="dropdown__item__title">plantes</span>
                <span className="dropdown__item__category">commercial</span>
              </Link>
              <Link
                to="#"
                className="dropdown__item"
                onMouseEnter={() => setActiveItem(1)}
              >
                <span className="dropdown__item__title">miromesnil</span>
                <span className="dropdown__item__category">
                  archi intérieure
                </span>
              </Link>
              <Link
                to="#"
                className="dropdown__item"
                onMouseEnter={() => setActiveItem(2)}
              >
                <span className="dropdown__item__title">jean-moulin</span>
                <span className="dropdown__item__category">commercial</span>
              </Link>
              <Link
                to="#"
                className="dropdown__item"
                onMouseEnter={() => setActiveItem(3)}
              >
                <span className="dropdown__item__title">saint-jacques</span>
                <span className="dropdown__item__category">
                  archi intérieure
                </span>
              </Link>
              <Link
                to="#"
                className="dropdown__item"
                onMouseEnter={() => setActiveItem(4)}
              >
                <span className="dropdown__item__title">flaine</span>
                <span className="dropdown__item__category">
                  archi intérieure
                </span>
              </Link>
            </div>
          </li>
          <li className="navbar__link">
            <Link to="/a-propos">à propos</Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}

export default Content
