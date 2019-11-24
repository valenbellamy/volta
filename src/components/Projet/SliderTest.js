import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import "./slider.scss"
import anime from "animejs/lib/anime.es.js"
import { animated, useTrail } from "react-spring"

const SliderTest = () => {
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
      img6: file(relativePath: { eq: "photo-3.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  let myRef = useRef(null)

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
        obj.childImageSharp.fluid.aspectRatio * (windowHeight * 0.6 - 16)
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
    anime({
      targets: myRef,
      translateX: function(el, i) {
        return -current * (i + 1)
      },
      easing: "easeOutExpo",
      duration: 800,
    })
  }

  return (
    <div
      className="slider"
      onMouseDown={mouseDown}
      onMouseLeave={mouseLeave}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
    >
      <div
        className="slider__inner"
        // style={{ transform: props.x.interpolate(trans) }}
        // style={{
        //   transform: interpolate([x], x => `translate3d(-${x}px,0,0) `),
        // }}
        // style={{
        //   transform: `translate3d(-${Math.floor(
        //     translateHorizontal
        //   )}px, 0px, 0px)`,
        // }}
        ref={el => {
          myRef = el
        }}
      >
        <Img
          imgStyle={{ width: "auto", position: "relative" }}
          placeholderStyle={{ width: "100%", position: "absolute" }}
          fluid={data.img1.childImageSharp.fluid}
        />
        <Img
          imgStyle={{ width: "auto", position: "relative" }}
          placeholderStyle={{ width: "100%", position: "absolute" }}
          fluid={data.img2.childImageSharp.fluid}
        />
        <Img
          imgStyle={{ width: "auto", position: "relative" }}
          placeholderStyle={{ width: "100%", position: "absolute" }}
          fluid={data.img3.childImageSharp.fluid}
        />
        <Img
          imgStyle={{ width: "auto", position: "relative" }}
          placeholderStyle={{ width: "100%", position: "absolute" }}
          fluid={data.img4.childImageSharp.fluid}
        />
        <Img
          imgStyle={{ width: "auto", position: "relative" }}
          placeholderStyle={{ width: "100%", position: "absolute" }}
          fluid={data.img5.childImageSharp.fluid}
        />
        <Img
          imgStyle={{ width: "auto", position: "relative" }}
          placeholderStyle={{ width: "100%", position: "absolute" }}
          fluid={data.img6.childImageSharp.fluid}
        />
      </div>
    </div>
  )
}

export default SliderTest
