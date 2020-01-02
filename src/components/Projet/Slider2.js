import React, { useState, useEffect, useLayoutEffect } from "react"
import Img from "gatsby-image"
import "./slider.scss"
import anime from "animejs/lib/anime.es.js"
import { animated, useSpring, config } from "react-spring"
import normalizeWheel from "normalize-wheel"

import Modal from "../Modal/Modal"
import useModal from "../Hooks/useModal"

const fast = { tension: 500, friction: 50 }
const trans = x => `translate3d(-${x}px,0,0)`

const Slider2 = ({ photos }) => {
  const [props, set] = useSpring(() => ({
    x: 0,
    //precision: 100,
    config: { tension: 600, friction: 100 },
    clamp: true,
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

  // function throttle(fn, wait) {
  //   var time = Date.now()
  //   return function() {
  //     if (time + wait - Date.now() < 0) {
  //       fn()
  //       time = Date.now()
  //     }
  //   }
  // }

  // function debounce(func, wait, immediate) {
  //   var timeout
  //   return function() {
  //     var context = this,
  //       args = arguments
  //     var later = function() {
  //       timeout = null
  //       if (!immediate) func.apply(context, args)
  //     }
  //     var callNow = immediate && !timeout
  //     clearTimeout(timeout)
  //     timeout = setTimeout(later, wait)
  //     if (callNow) func.apply(context, args)
  //   }
  // }

  // const isFirefox = typeof InstallTrigger !== "undefined"
  // let scrollSpeed = isFirefox ? 40 * 1.8 : 1 * 1.8
  let scrollSpeed = 1.8
  const scrollUpdate = e => {
    if (!desktop) return
    const normalized = normalizeWheel(e)
    let delta = normalized.pixelY ? normalized.pixelY : normalized.pixelX
    console.log(delta)
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
      <div
        className={`slider ${down ? "active" : ""}`}
        // onMouseDown={mouseDown}
        // onMouseLeave={mouseLeave}
        // onMouseUp={mouseUp}
        // onMouseMove={mouseMove}
        onWheel={scrollUpdate}
      >
        <animated.div
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
      </div>
      <Modal isShowing={isShowing} hide={toggle} content={imgModal} />
    </>
  )
}

export default Slider2
