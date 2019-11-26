import React, { useState, useEffect, useLayoutEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "./slider.scss"
import anime from "animejs/lib/anime.es.js"
import { animated, useTrail } from "react-spring"

const fast = { tension: 600, friction: 100 }
const trans = x => `translate3d(-${x}px,0,0)`

const Slider = () => {
  const data = useStaticQuery(graphql`
    query {
      img1: file(relativePath: { eq: "photo-1.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img2: file(relativePath: { eq: "photo-2.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img3: file(relativePath: { eq: "photo-3.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img4: file(relativePath: { eq: "photo-4.jpg" }) {
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
      img6: file(relativePath: { eq: "photo-6.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img7: file(relativePath: { eq: "photo-7.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img8: file(relativePath: { eq: "photo-8.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img9: file(relativePath: { eq: "photo-9.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [trail, set] = useTrail(1, () => ({
    x: 0,
    config: fast,
  }))
  const [down, setDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [rightLimit, setRightLimit] = useState(0)
  const [translateHorizontal, setTranslateHorizontal] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    anime(
      {
        targets: ".gatsby-image-wrapper",
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 200 * i,
      },
      0
    )
  }, [])

  useLayoutEffect(() => {
    computeWidth()
  }, [])

  const computeWidth = () => {
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let acc = 0
    let margin = 8
    let gutter = 16
    let size = Object.keys(data).length
    for (let key in data) {
      if (!data.hasOwnProperty(key)) continue
      var obj = data[key]
      var currentWidth =
        obj.childImageSharp.fluid.aspectRatio * (windowHeight * 1 - 16 * 2)
      console.log(currentWidth)
      acc += currentWidth
    }
    acc = acc - windowWidth + (size - 1) * margin + 2 * gutter
    setRightLimit(acc)
  }

  const mouseDown = e => {
    e.preventDefault()
    setDown(true)
    setStartX(e.pageX)
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
    let x = e.pageX
    let walk = x - startX
    let current = currentTranslate - walk
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
      className="slider"
      onMouseDown={mouseDown}
      onMouseLeave={mouseLeave}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
    >
      {trail.map((props, index) => (
        <animated.div
          key={index}
          className="slider__inner"
          style={{ transform: props.x.interpolate(trans) }}
        >
          <Img
            imgStyle={{ width: "auto", position: "relative" }}
            placeholderStyle={{ width: "100%", position: "absolute" }}
            fluid={data.img1.childImageSharp.fluid}
            loading="eager"
          />
          <Img
            imgStyle={{ width: "auto", position: "relative" }}
            placeholderStyle={{ width: "100%", position: "absolute" }}
            fluid={data.img2.childImageSharp.fluid}
            loading="eager"
          />
          <Img
            imgStyle={{ width: "auto", position: "relative" }}
            placeholderStyle={{ width: "100%", position: "absolute" }}
            fluid={data.img3.childImageSharp.fluid}
            loading="eager"
          />
          <Img
            imgStyle={{ width: "auto", position: "relative" }}
            placeholderStyle={{ width: "100%", position: "absolute" }}
            fluid={data.img4.childImageSharp.fluid}
            loading="eager"
          />
          <Img
            imgStyle={{ width: "auto", position: "relative" }}
            placeholderStyle={{ width: "100%", position: "absolute" }}
            fluid={data.img5.childImageSharp.fluid}
            loading="eager"
          />
          <Img
            imgStyle={{ width: "auto", position: "relative" }}
            placeholderStyle={{ width: "100%", position: "absolute" }}
            fluid={data.img6.childImageSharp.fluid}
            loading="eager"
          />
          <Img
            imgStyle={{ width: "auto", position: "relative" }}
            placeholderStyle={{ width: "100%", position: "absolute" }}
            fluid={data.img7.childImageSharp.fluid}
            loading="eager"
          />
          <Img
            imgStyle={{ width: "auto", position: "relative" }}
            placeholderStyle={{ width: "100%", position: "absolute" }}
            fluid={data.img8.childImageSharp.fluid}
            loading="eager"
          />
          <Img
            imgStyle={{ width: "auto", position: "relative" }}
            placeholderStyle={{ width: "100%", position: "absolute" }}
            fluid={data.img9.childImageSharp.fluid}
            loading="eager"
          />
        </animated.div>
      ))}
    </animated.div>
  )
}

export default Slider
