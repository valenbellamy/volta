import React, { useState, useEffect, useLayoutEffect } from "react"
import Img from "gatsby-image"
import "./slider.scss"
import anime from "animejs/lib/anime.es.js"
import { animated, useTrail, config } from "react-spring"
import normalizeWheel from "normalize-wheel"

import Modal from "../Modal/Modal"
import useModal from "../Hooks/useModal"

const fast = { mass: 2, tension: 350, friction: 40 }
const trans = x => `translate3d(-${x}px,0,0)`

const Slider4 = ({ photos }) => {
  const [trail, set] = useTrail(1, () => ({
    x: 0,
    config: fast,
  }))

  // Modal hooks
  const { isShowing, toggle } = useModal()
  const [imgModal, setImgModal] = useState(null)

  // Scroll and drag hooks
  const [down, setDown] = useState(false)
  const [move, setMove] = useState(false)
  const [startX, setStartX] = useState(0)
  const [rightLimit, setRightLimit] = useState(0)
  const [translateHorizontal, setTranslateHorizontal] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)

  const [slideWidth, setSlideWidth] = useState("auto")
  const [desktop, setDesktop] = useState(null)

  // Images load hooks
  // const [pictures, setPictures] = useState(photos.length)
  const [itemloaded, setItemloaded] = useState(0)

  useEffect(() => {
    if (itemloaded === photos.length) {
      anime(
        {
          targets: ".gatsby-image-wrapper",
          opacity: 1,
          easing: "linear",
          duration: 300,
          delay: (el, i) => 100 * i,
        },
        0
      )
    }
  }, [itemloaded])

  useEffect(() => {
    window.addEventListener("contextmenu", disableRight)
    return () => window.removeEventListener("resize", disableRight)
  })

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

  // const mouseDown = e => {
  //   if (!desktop) return
  //   e.preventDefault()
  //   setDown(true)
  //   setStartX(e.pageX)
  //   setCurrentTranslate(translateHorizontal)
  // }

  // const mouseLeave = e => {
  //   if (!desktop) return
  //   setDown(false)
  //   setMove(false)
  // }

  // const mouseUp = e => {
  //   if (!desktop) return
  //   setMove(false)
  //   setDown(false)
  // }

  // let dragSpeed = 1.8
  // const mouseMove = e => {
  //   setMove(true)
  //   if (!desktop) return
  //   if (!down) return
  //   e.preventDefault()
  //   let x = e.pageX
  //   let walk = x - startX
  //   let current = currentTranslate - walk * dragSpeed
  //   current = Math.min(rightLimit, current)
  //   current = Math.max(0, current)
  //   setTranslateHorizontal(Math.floor(current))
  //   set({ x: translateHorizontal })
  // }

  // const isFirefox = typeof InstallTrigger !== "undefined"
  // let scrollSpeed = isFirefox ? 40 * 1.8 : 1 * 1.8
  let scrollSpeed = 1.8
  const scrollUpdate = e => {
    if (!desktop) return
    const normalized = normalizeWheel(e)
    let delta = normalized.pixelY ? normalized.pixelY : normalized.pixelX
    //let delta = e.deltaY ? e.deltaY : e.deltaX
    setCurrentTranslate(translateHorizontal)
    let current = currentTranslate + delta * scrollSpeed
    current = Math.min(rightLimit, current)
    current = Math.max(0, current)
    setTranslateHorizontal(Math.floor(current))
    set({ x: translateHorizontal })
  }

  const disableRight = e => {
    e.preventDefault()
  }

  return (
    <>
      <animated.div
        className={`slider ${down ? "active" : ""}`}
        // onMouseDown={mouseDown}
        // onMouseLeave={mouseLeave}
        // onMouseUp={mouseUp}
        // onMouseMove={mouseMove}
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
                <Img
                  key={photo.id}
                  alt={photo.description}
                  imgStyle={{ width: "auto", position: "relative" }}
                  placeholderStyle={{ width: "100%", position: "absolute" }}
                  fluid={photo.fluid}
                  onLoad={() => {
                    setItemloaded(itemloaded => itemloaded + 1)
                  }}
                  onClick={() => {
                    if (window.innerWidth > 768) {
                      toggle()
                      setImgModal(photo.fluid)
                    }
                  }}
                  loading="eager"
                />
              ))}
          </animated.div>
        ))}
      </animated.div>
      <Modal isShowing={isShowing} hide={toggle} content={imgModal} />
    </>
  )
}

export default Slider4
