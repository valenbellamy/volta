import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import "./content.scss"
import anime from "animejs/lib/anime.es.js"

const Content = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    })
    anime({
      targets: ".toggle__button",
      opacity: 1,
      duration: 400,
      easing: "easeInOutExpo",
      delay: 300,
    })
  }, [])

  return (
    <>
      <div
        className={`toggle__button anime-js ${
          !visible ? "" : "translate--btn"
        }`}
      >
        <div className="open">
          <button
            type="button"
            onClick={() => {
              setVisible(true)
            }}
          >
            Informations sur le projet
          </button>
        </div>
        <div className="close">
          <button
            type="button"
            onClick={() => {
              setVisible(false)
            }}
          >
            Cacher les informations
          </button>
        </div>
      </div>
      <div className={`info anime-js ${visible ? "visible" : ""}`}>
        <div className="info__logo">
          <Link to="/">Volta Archi</Link>
        </div>
        <div className="info__nav">
          <div className="info__link info__link--dropdown">
            réalisations
            <div className="dropdown" id="dropdown">
              <Link
                to="/projet"
                className="dropdown__item dropdown__item--dark"
                data-index="0"
              >
                <span className="dropdown__item__title">plantes</span>
                <span className="dropdown__item__category">commercial</span>
              </Link>
              <Link
                to="/projet"
                className="dropdown__item dropdown__item--dark"
                data-index="1"
              >
                <span className="dropdown__item__title">miromesnil</span>
                <span className="dropdown__item__category">
                  archi intérieure
                </span>
              </Link>
              <Link
                to="/projet"
                className="dropdown__item dropdown__item--dark"
                data-index="2"
              >
                <span className="dropdown__item__title">jean-moulin</span>
                <span className="dropdown__item__category">commercial</span>
              </Link>
              <Link
                to="/projet"
                className="dropdown__item dropdown__item--dark"
                data-index="3"
              >
                <span className="dropdown__item__title">saint-jacques</span>
                <span className="dropdown__item__category">
                  archi intérieure
                </span>
              </Link>
              <Link
                to="/projet"
                className="dropdown__item dropdown__item--dark"
                data-index="4"
              >
                <span className="dropdown__item__title">flaine</span>
                <span className="dropdown__item__category">
                  archi intérieure
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="info__content">
          <div className="info__content__title mbm">
            <h1>
              Flaine <span>2018</span>
            </h1>
          </div>
          <div className="mbm">
            <p>Réhabilitation d'un appartement montagne.</p>
          </div>
          <div>
            <div>Maîtrise d'ouvrage: privé</div>
            <div>Surface: 50 m²</div>
            <div>Lieu: Flaine, France</div>
            <div>Mission: mission complète conception/réalisation</div>
          </div>
        </div>

        <div className="info__link">
          <Link to="/a-propos">à propos</Link>
        </div>
      </div>
    </>
  )
}

export default Content
