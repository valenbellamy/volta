import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import anime from "animejs/lib/anime.es.js"
import Dropdown from "../Dropdown/Dropdown"
import DropdownMobilier from "../Dropdown/DropdownMobilier"
import DropdownArchive from "../Dropdown/DropdownArchive"
import "./content.scss"

const Content = () => {
  const [open, setOpen] = useState(false)
  const [openMobilier, setOpenMobilier] = useState(false)
  const [openArchives, setOpenArchives] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      contentfulVolta {
        titre1
        paragraphe1 {
          paragraphe1
        }
        titre2
        paragraphe2 {
          paragraphe2
        }
        titre3
        paragraphe3 {
          paragraphe3
        }
        paragraphe4
        adresse
        mail
      }
    }
  `)

  const {
    titre1,
    titre2,
    titre3,
    paragraphe1,
    paragraphe2,
    paragraphe3,
    paragraphe4,
    adresse,
    mail,
  } = data.contentfulVolta

  useEffect(() => {
    anime(
      {
        targets: ".anime-text",
        opacity: 1,
        translateY: [100, 0],
        easing: "easeOutExpo",
        duration: 1000,
        delay: (el, i) => 120 * i,
      },
      200
    )
  }, [])
  return (
    <>
      <div className="logo--dark">
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
      <div className="content">
        <div className="content__blk content__blk--flex">
          <div>
            <h1>{titre1}</h1>
            <p className="fs-lg">{paragraphe1.paragraphe1}</p>
          </div>

          <div className="content__sm--pb hidden--sm">
            <p className="fs-sm ">
              Contact <br />
              {adresse}
              <br />
              {mail}
            </p>
            <div>
              <a
                href="https://www.instagram.com/volta.archi/"
                target="_blank"
                className="fs-sm"
                rel="noreferrer noopener"
              >
                <svg
                  x="0px"
                  y="0px"
                  width="169.063px"
                  height="169.063px"
                  viewBox="0 0 169.063 169.063"
                >
                  <g>
                    <path
                      d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752
      c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407
      c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752
      c17.455,0,31.656,14.201,31.656,31.655V122.407z"
                    />
                    <path
                      d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561
      C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561
      c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z"
                    />
                    <path
                      d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78
      c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78
      C135.661,29.421,132.821,28.251,129.921,28.251z"
                    />
                  </g>
                </svg>
                <span>volta.archi</span>
              </a>
            </div>
          </div>
        </div>
        <div className="content__blk">
          <h2>{titre2}</h2>
          <p className="mbm">{paragraphe2.paragraphe2}</p>
          <h2>{titre3}</h2>
          <p>{paragraphe3.paragraphe3}</p>
          {paragraphe4 && <p>{paragraphe4}</p>}
        </div>
      </div>
      <div className="content content__sm--pb visible--sm">
        <div className="content__blk">
          <p className="fs-sm ">
            Contact <br />
            {adresse}
            <br />
            {mail}
          </p>
          <div>
            <a
              href="https://www.instagram.com/volta.archi/"
              target="_blank"
              className="fs-sm"
              rel="noreferrer noopener"
            >
              <svg
                x="0px"
                y="0px"
                width="169.063px"
                height="169.063px"
                viewBox="0 0 169.063 169.063"
              >
                <g>
                  <path
                    d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752
      c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407
      c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752
      c17.455,0,31.656,14.201,31.656,31.655V122.407z"
                  />
                  <path
                    d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561
      C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561
      c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z"
                  />
                  <path
                    d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78
      c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78
      C135.661,29.421,132.821,28.251,129.921,28.251z"
                  />
                </g>
              </svg>
              <span>volta.archi</span>
            </a>
          </div>
        </div>
      </div>
      <nav className="navbar navbar--fixed bg--sm">
        <ul className={`navbar__nav ${open ? "bg-white" : ""}`}>
          <div>
            <li
              className={`navbar__link navbar__link--dark navbar__link--dropdown ${
                open ? "open" : ""
              }`}
              onClick={() => {
                setOpenMobilier(false)
                setOpenArchives(false)
                setOpen(!open)
              }}
            >
              <span>réalisations</span>
              <Dropdown className="dropdown--home-project" />
            </li>
            <li
              className={`navbar__link navbar__link--dark navbar__link--dropdown ${
                openMobilier ? "open" : ""
              }`}
              onClick={() => {
                setOpen(false)
                setOpenMobilier(!openMobilier)
                setOpenArchives(false)
              }}
            >
              <span>mobilier</span>
              <DropdownMobilier className="dropdown--home-mobilier" />
            </li>
            <li
              className={`navbar__link navbar__link--dark navbar__link--dropdown ${
                openArchives ? "open" : ""
              }`}
              onClick={() => {
                setOpen(false)
                setOpenMobilier(false)
                setOpenArchives(!openArchives)
              }}
            >
              <span>archives</span>
              <DropdownArchive className="dropdown--home-archive" />
            </li>
          </div>
          <li className="navbar__link navbar__link--dark">
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
    </>
  )
}

export default Content
