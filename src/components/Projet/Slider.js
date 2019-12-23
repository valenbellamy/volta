import React, { useState, useEffect, useLayoutEffect } from "react"
import Img from "gatsby-image"
import "./slider.scss"
import anime from "animejs/lib/anime.es.js"
import { animated, useTrail } from "react-spring"
import normalizeWheel from "normalize-wheel"

const fast = { tension: 600, friction: 100 }
const trans = x => `translate3d(-${x}px,0,0)`

const Slider = ({ photos }) => {
  const [trail, set] = useTrail(1, () => ({
    x: 0,
    config: fast,
  }))
  const [down, setDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [rightLimit, setRightLimit] = useState(0)
  const [translateHorizontal, setTranslateHorizontal] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)

  const [slideWidth, setSlideWidth] = useState("auto")
  const [desktop, setDesktop] = useState(null)

  const [itemloaded, setItemloaded] = useState(0)
  useEffect(() => {
    if (itemloaded === photos.length) {
      anime(
        {
          targets: ".photo",
          opacity: [0, 1],
          easing: "linear",
          duration: 300,
          delay: (el, i) => 100 * i,
        },
        0
      )
    }
  }, [itemloaded])

  useLayoutEffect(() => {
    if (typeof window.orientation !== "undefined") {
      setSlideWidth(window.innerWidth - 0)
      setDesktop(false)
    } else {
      setDesktop(true)
      computeWidth()
      window.addEventListener("resize", computeWidth)
      return () => window.removeEventListener("resize", computeWidth)
    }
  }, [])

  const computeWidth = () => {
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let acc = 0
    let margin = 8
    let gutter = 16
    let heightInfos = 210
    let blank = 48
    let size = photos.length

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
    if (!desktop) return
    e.preventDefault()
    setDown(true)
    setStartX(e.pageX)
    setCurrentTranslate(translateHorizontal)
  }

  const mouseLeave = e => {
    if (!desktop) return
    setDown(false)
  }

  const mouseUp = e => {
    if (!desktop) return
    setDown(false)
  }

  let dragSpeed = 1.8
  const mouseMove = e => {
    if (!desktop) return
    if (!down) return
    e.preventDefault()
    let x = e.pageX
    let walk = x - startX
    let current = currentTranslate - walk * dragSpeed
    current = Math.min(rightLimit, current)
    current = Math.max(0, current)
    setTranslateHorizontal(Math.floor(current))
    set({ x: translateHorizontal })
  }

  // const isFirefox = typeof InstallTrigger !== "undefined"
  // let scrollSpeed = isFirefox ? 40 * 1.8 : 1 * 1.8
  let scrollSpeed = 1.8
  const scrollUpdate = e => {
    if (!desktop) return
    const normalized = normalizeWheel(e)
    // console.log(normalized.pixelX, normalized.pixelY)
    //let delta = e.deltaY ? Math.floor(e.deltaY) : Math.floor(e.deltaX)
    let delta = normalized.pixelY ? normalized.pixelY : normalized.pixelX
    setCurrentTranslate(translateHorizontal)
    let current = currentTranslate + delta * scrollSpeed
    current = Math.min(rightLimit, current)
    current = Math.max(0, current)
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
      onWheel={scrollUpdate}
    >
      {trail.map((props, index) => (
        <animated.div
          key={index}
          className={`slider__inner ${desktop ? "" : "not-desktop"}`}
          style={{ transform: props.x.interpolate(trans), width: slideWidth }}
        >
          {photos &&
            photos.map(photo => (
              <div className="photo" key={photo.id}>
                <Img
                  alt={photo.description}
                  imgStyle={{ width: "auto", position: "relative" }}
                  placeholderStyle={{ width: "100%", position: "absolute" }}
                  fluid={photo.fluid}
                  //backgroundColor="#eeeeee"
                  onLoad={() => setItemloaded(itemloaded + 1)}
                  loading="eager"
                />
              </div>
            ))}
        </animated.div>
      ))}
    </animated.div>
  )
}

export default Slider
