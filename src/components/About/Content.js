import React, { useEffect } from "react"
import { Link } from "gatsby"
import "./content.scss"
import anime from "animejs/lib/anime.es.js"

const Content = () => {
  useEffect(() => {
    anime({
      targets: ".anime-text",
      opacity: 1,
      translateY: [80, 0],
      easing: "easeOutExpo",
      duration: 1000,
      delay: (el, i) => 100 * i,
    })
  })
  return (
    <>
      <div className="logo--dark">
        <Link to="/">Volta Archi</Link>
      </div>
      <div className="content">
        <div className="content__blk">
          <h1 className="anime-text">L'agence</h1>
          <p className="mbl anime-text">
            Volta est une agence exerçant dans les domaines de l’architecture et
            l’architecture d’intérieur. Créée en 2016 par Agathe Lavaud, elle
            articule son travail autour du soucis du détail et d'un tandem entre
            contemporanéité et tradition.
          </p>
          <h2 className="anime-text">Collaboration</h2>
          <p className="mbl anime-text">
            Elodie Biehlmann, architecte diplômée d’Etat de l’Ecole Nationale de
            Marne-la-Vallée
          </p>
          <p className="fs-sm anime-text">
            Contact <br />
            3, rue de l’Asile Popincourt 75011 Paris
            <br />
            contact@volta-architecture.com
          </p>
        </div>
        <div className="content__blk">
          <h2 className="anime-text">Agathe Lavaud</h2>
          <p className="anime-text">
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
        </div>
      </div>
      <nav className="navbar">
        <ul className="navbar__nav">
          <li className="navbar__link navbar__link--dark navbar__link--dropdown">
            réalisations
            <div className="dropdown" id="dropdown">
              <Link
                to="/projet"
                className="dropdown__item dropdown__item--dark"
              >
                <span className="dropdown__item__title">plantes</span>
                <span className="dropdown__item__category">commercial</span>
              </Link>
              <Link
                to="/projet"
                className="dropdown__item dropdown__item--dark"
              >
                <span className="dropdown__item__title">miromesnil</span>
                <span className="dropdown__item__category">
                  archi intérieure
                </span>
              </Link>
              <Link
                to="/projet"
                className="dropdown__item dropdown__item--dark"
              >
                <span className="dropdown__item__title">jean-moulin</span>
                <span className="dropdown__item__category">commercial</span>
              </Link>
              <Link
                to="/projet"
                className="dropdown__item dropdown__item--dark"
              >
                <span className="dropdown__item__title">saint-jacques</span>
                <span className="dropdown__item__category">
                  archi intérieure
                </span>
              </Link>
              <Link
                to="/projet"
                className="dropdown__item dropdown__item--dark"
              >
                <span className="dropdown__item__title">flaine</span>
                <span className="dropdown__item__category">
                  archi intérieure
                </span>
              </Link>
            </div>
          </li>
          <li className="navbar__link navbar__link--dark">à propos</li>
        </ul>
      </nav>
    </>
  )
}

export default Content
