import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import anime from "animejs/lib/anime.es.js"
import { LIMIT } from "../../constants/projects"
import "./content.scss"

const Content = () => {
  const [index, setIndex] = useState(0)
  const [landscape, setLandscape] = useState()
  const [open, setOpen] = useState(false)
  const [openMobilier, setOpenMobilier] = useState(false)
  const [openArchive, setOpenArchive] = useState(false)
  const [randomvalue, setRandomvalue] = useState(0)
  const data = useStaticQuery(graphql`
    query {
      contentfulDiaporama(titre: { eq: "diaporama" }) {
        ordinateur {
          id
          title
          description
          fluid(maxWidth: 2000) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        smartphone {
          id
          title
          description
          fluid(maxWidth: 1000) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      allContentfulProjet(sort: { fields: createdAt, order: DESC }) {
        edges {
          node {
            id
            titre
            catgorie
            slug
            couverture {
              id
              description
              fluid(maxWidth: 2000) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
            couvertureSmartphone {
              id
              description
              fluid(maxWidth: 1000) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
            archive
          }
        }
      }
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

  const lengthDiapo = data.contentfulDiaporama.ordinateur.length
  const lengthDiapoSmartphone = data.contentfulDiaporama.smartphone.length

  useEffect(() => {
    if (typeof window.orientation === "undefined") {
      setLandscape(true)
      setRandomvalue(Math.floor(Math.random() * lengthDiapo))
    } else if (window.orientation === 0) {
      setLandscape(false)
      setRandomvalue(Math.floor(Math.random() * (lengthDiapoSmartphone - 1)))
    } else {
      setLandscape(true)
      setRandomvalue(Math.floor(Math.random() * lengthDiapo))
    }
  }, [])

  useEffect(() => {
    anime(
      {
        targets: ".bg-image",
        opacity: 1,
        easing: "linear",
        duration: 600,
      },
      0
    )
  }, [])

  const setActiveItem = item => {
    setIndex(item)
  }

  const projects = data.allContentfulProjet.edges.filter(d => !d.node.archive)
  const archives = data.allContentfulProjet.edges.filter(d => d.node.archive)

  return (
    <main>
      <div className="logo">
        <Link to="/">
          <svg x="0px" y="0px" viewBox="300 450 3800 1250">
            <polygon points="767.3,1482.39 510.3,836.39 330.3,836.39 650.3,1628.39 884.3,1628.39 1204.3,836.39 1024.3,836.39 " />
            <polygon
              points="2852.3,573.39 2682.3,573.39 2682.3,1628.39 2852.3,1628.39 2852.3,993.39 3117.3,993.39 3117.3,836.39 
	2852.3,836.39 "
            />
            <path
              d="M3846.3,836.39V959c-39.19-73.07-133.84-141.61-265-141.61c-232,0-398,187-398,416c0,229,166,416,398,416
	c131.16,0,225.81-68.54,265-141.61v120.61h163v-792H3846.3z M3602.3,1493.39c-140,0-247-119-247-260c0-141,106-260,247-260
	c138,0,244,119,244,260C3846.3,1374.39,3740.3,1493.39,3602.3,1493.39"
            />
            <path
              d="M1672.3,815.39c-229,0-416,187-416,416c0,231,187,418,416,418c232,0,418-187,418-418
	C2090.3,1002.39,1904.3,815.39,1672.3,815.39 M1672.3,1493.39c-138,0-244-120-244-262c0-141,106-260,244-260c141,0,245,119,245,260
	C1917.3,1373.39,1813.3,1493.39,1672.3,1493.39"
            />
            <rect x="2260.3" y="573.39" width="169" height="1055" />
          </svg>
        </Link>
      </div>
      <div className="bg-image">
        {landscape ? (
          <div className={`bg-image__wrapper ${index === 0 ? "active" : ""}`}>
            <BackgroundImage
              className="default-bg"
              fluid={data.contentfulDiaporama.ordinateur[randomvalue].fluid}
            />
          </div>
        ) : (
          <div className={`bg-image__wrapper ${index === 0 ? "active" : ""}`}>
            <BackgroundImage
              className="default-bg"
              fluid={data.contentfulDiaporama.smartphone[randomvalue].fluid}
            />
          </div>
        )}
        {projects.map((edge, i) => (
          <div
            key={edge.node.id}
            className={`bg-image__wrapper ${index === i + 1 ? "active" : ""}`}
          >
            <BackgroundImage
              className="default-bg"
              fluid={
                landscape
                  ? edge.node.couverture.fluid
                  : edge.node.couvertureSmartphone.fluid
              }
            />
          </div>
        ))}

        <div className="bg"></div>
      </div>
      <nav className="navbar navbar--fixed">
        <ul className="navbar__nav">
          <div>
            <li
              className={`navbar__link navbar__link--dropdown ${
                open ? "open" : ""
              }`}
              onClick={() => {
                setOpenMobilier(false)
                setOpenArchive(false)
                setOpen(!open)
              }}
            >
              <span>réalisations</span>
              <div className="dropdown dropdown--home-project" id="dropdown">
                {projects.map((edge, i) => {
                  if (i > LIMIT) return null
                  return (
                    <Link
                      key={edge.node.id}
                      to={`/${edge.node.slug}`}
                      className="dropdown__item"
                      onMouseEnter={() => setActiveItem(i + 1)}
                    >
                      <span className="dropdown__item__title">
                        {edge.node.titre}
                      </span>
                      <span className="dropdown__item__category">
                        {edge.node.catgorie}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </li>
            <li
              className={`navbar__link navbar__link--dropdown ${
                openMobilier ? "open" : ""
              }`}
              onClick={() => {
                setOpen(false)
                setOpenMobilier(!openMobilier)
                setOpenArchive(false)
              }}
            >
              <span>mobilier</span>
              <div className="dropdown dropdown--home-mobilier" id="dropdown">
                {data.allContentfulMobilier.edges.map(edge => (
                  <Link
                    key={edge.node.id}
                    to={`/${edge.node.slug}`}
                    className="dropdown__item"
                  >
                    <span className="dropdown__item__title">
                      {edge.node.titre}
                    </span>
                  </Link>
                ))}
              </div>
            </li>
            <li
              className={`navbar__link navbar__link--dropdown ${
                openArchive ? "open" : ""
              }`}
              onClick={() => {
                setOpen(false)
                setOpenMobilier(false)
                setOpenArchive(!openArchive)
              }}
            >
              <span>archives</span>
              <div className="dropdown dropdown--home-archive" id="dropdown">
                {archives.map(edge => (
                  <Link
                    key={edge.node.id}
                    to={`/${edge.node.slug}`}
                    className="dropdown__item"
                  >
                    <span className="dropdown__item__title">
                      {edge.node.titre}
                    </span>
                    <span className="dropdown__item__category">
                      {edge.node.catgorie}
                    </span>
                  </Link>
                ))}
              </div>
            </li>
          </div>
          <li className="navbar__link">
            <Link
              to="/presse"
              style={{
                display: "block",
                marginBottom: "0.6rem",
                textAlign: "right",
              }}
            >
              presse
            </Link>
            <Link to="/a-propos" style={{ display: "block" }}>
              à propos
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}

export default Content
