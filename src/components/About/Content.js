import React, { useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Dropdown from "../Dropdown/Dropdown"
import "./content.scss"
import anime from "animejs/lib/anime.es.js"

const Content = () => {
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
  })
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
        <div className="content__blk mbl">
          <h1 className="anime-text">L'agence</h1>
          <p className="fs-lg anime-text">
            Volta est une agence exerçant dans les domaines de l’architecture et
            l’architecture d’intérieur. Créée en 2016 par Agathe Lavaud, elle
            articule son travail autour du soucis du détail et d'un tandem entre
            contemporanéité et tradition.
          </p>
        </div>
        <div className="content__blk">
          <h2 className="anime-text">Agathe Lavaud</h2>
          <p className="anime-text mbm">
            Curieuse de découvrir les différentes pratiques de l’Architecture et
            du projet, Agathe Lavaud commence ses études à l’ESAG Penninghen et
            obtient son diplôme d’architecte d’intérieur en 2014. Elle poursuit
            par la suite son parcours à l’Ecole Nationale Supérieure
            d’Architecture de Marne-la-Vallée, expériences entrecoupées par un
            semestre d’étude en Italie. Par la suite, elle intègre l’agence
            Renzo Piano Building Workshop, où elle reçoit son Habilitation à la
            Maîtrise d’Œuvre en son Nom Propre. Après plusieurs expériences en
            agence (Wilmotte & Associés, Vidalenc Architectes, Thierry Lemaire
            Architecture), elle décide de monter sa propre structure en se
            spécialisant dans la commande privée.
          </p>
          <h2 className="anime-text">Collaboration</h2>
          <p className="mbl anime-text">
            Elodie Biehlmann, architecte diplômée d’Etat de l’Ecole Nationale de
            Marne-la-Vallée
          </p>
        </div>
      </div>
      <div className="content mbm">
        <div className="content__blk">
          <p className="fs-sm anime-text">
            Contact <br />
            3, rue de l’Asile Popincourt 75011 Paris
            <br />
            contact@volta-architecture.com
          </p>
        </div>
      </div>
      <nav className="navbar">
        <ul className="navbar__nav">
          <li className="navbar__link navbar__link--dark navbar__link--dropdown">
            réalisations
            <Dropdown />
          </li>
          <li className="navbar__link navbar__link--dark is-active">
            <Link to="/a-propos">à propos</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Content
