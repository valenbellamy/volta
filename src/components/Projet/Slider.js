import React, { useState, useEffect, useLayoutEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "./slider.scss"
import anime from "animejs/lib/anime.es.js"
import { animated, useTrail } from "react-spring"

const fast = { tension: 600, friction: 100 }
const trans = x => `translate3d(-${x}px,0,0)`

const Slider = ({ photos }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     cursor: file(relativePath: { eq: "cursor.png" }) {
  //       childImageSharp {
  //         fixed(width: 50) {
  //           ...GatsbyImageSharpFixed
  //         }
  //       }
  //     }
  //   }
  // `)

  const [trail, set] = useTrail(1, () => ({
    x: 0,
    config: fast,
  }))
  const [down, setDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [rightLimit, setRightLimit] = useState(0)
  const [translateHorizontal, setTranslateHorizontal] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  useEffect(() => {
    anime(
      {
        targets: ".gatsby-image-wrapper",
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 100 * i,
      },
      0
    )
  }, [])

  useLayoutEffect(() => {
    computeWidth()
    window.addEventListener("resize", computeWidth)
    return () => window.removeEventListener("resize", computeWidth)
  }, [])

  const computeWidth = () => {
    let windowHeight = window.innerHeight
    //let vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    //document.documentElement.style.setProperty("--vh", `${vh}px`)
    let windowWidth = window.innerWidth
    let acc = 0
    let margin = 8
    let gutter = 16
    let heightInfos = 0
    let blank = 0
    // let heightInfos = 229
    // let blank = 0
    let size = photos.length

    if (window.innerWidth > 769) {
      heightInfos = 210
      blank = 48
    } else {
      heightInfos = 229
      // blank = -56
      blank = 0
    }

    photos.map(photo => {
      var currentWidth =
        photo.fluid.aspectRatio *
        (windowHeight - heightInfos - blank - gutter * 2)
      acc += currentWidth
    })
    acc = acc - windowWidth + (size - 1) * margin + 2 * gutter
    setRightLimit(acc)
  }

  const mouseDown = e => {
    e.preventDefault()
    setDown(true)
    if (
      e.type === "touchstart" ||
      e.type === "touchmove" ||
      e.type === "touchend" ||
      e.type === "touchcancel"
    ) {
      var touch = e.changedTouches[0]
      setStartX(touch.pageX)
    } else if (
      e.type === "mousedown" ||
      e.type === "mouseup" ||
      e.type === "mousemove" ||
      e.type === "mouseover" ||
      e.type === "mouseout" ||
      e.type === "mouseenter" ||
      e.type === "mouseleave"
    ) {
      setStartX(e.pageX)
    }
    setCurrentTranslate(translateHorizontal)
  }

  const mouseLeave = e => {
    setDown(false)
  }

  const mouseUp = e => {
    setDown(false)
  }

  const mouseMove = e => {
    if (!down) return
    e.preventDefault()
    let x = 0
    let speed = 1
    if (
      e.type === "touchstart" ||
      e.type === "touchmove" ||
      e.type === "touchend" ||
      e.type === "touchcancel"
    ) {
      var touch = e.changedTouches[0]
      x = touch.pageX
      speed = 3
    } else if (
      e.type === "mousedown" ||
      e.type === "mouseup" ||
      e.type === "mousemove" ||
      e.type === "mouseover" ||
      e.type === "mouseout" ||
      e.type === "mouseenter" ||
      e.type === "mouseleave"
    ) {
      x = e.pageX
      speed = 1.8
    }
    let walk = x - startX
    let current = currentTranslate - walk * speed
    if (current >= rightLimit) {
      current = rightLimit
    }
    if (current < 0) {
      current = 0
    }
    setTranslateHorizontal(Math.floor(current))
    set({ x: translateHorizontal })
  }

  return (
    <animated.div
      className={`slider ${down ? "active" : ""}`}
      onMouseDown={mouseDown}
      onMouseLeave={mouseLeave}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      onTouchStart={mouseDown}
      onTouchEnd={mouseUp}
      onTouchMove={mouseMove}
      //style={{ cursor: `url(${data.cursor.childImageSharp.fixed.src})` }}
    >
      {trail.map((props, index) => (
        <animated.div
          key={index}
          className="slider__inner"
          style={{ transform: props.x.interpolate(trans) }}
        >
          {photos &&
            photos.map(photo => (
              <Img
                key={photo.id}
                alt={photo.description}
                imgStyle={{ width: "auto", position: "relative" }}
                placeholderStyle={{ width: "100%", position: "absolute" }}
                fluid={photo.fluid}
                loading="eager"
              />
            ))}
        </animated.div>
      ))}
    </animated.div>
  )
}

export default Slider
