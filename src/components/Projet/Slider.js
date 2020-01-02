import React, { useState, useEffect, useLayoutEffect } from "react"
import Img from "gatsby-image"
import "./slider.scss"
import anime from "animejs/lib/anime.es.js"
import { animated, useSpring } from "react-spring"
import { useWheel } from "react-use-gesture"

import Modal from "../Modal/Modal"
import useModal from "../Hooks/useModal"

const Slider = ({ photos }) => {
  // Modal hooks
  const { isShowing, toggle } = useModal()
  const [imgModal, setImgModal] = useState(null)

  // Scroll and drag hooks
  const [rightLimit, setRightLimit] = useState(0)

  const [slideWidth, setSlideWidth] = useState("auto")
  const [desktop, setDesktop] = useState(null)

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

  // Scroll

  const domTarget = React.useRef(null)
  const [{ x }, set] = useSpring(() => ({
    x: 0,
  }))

  let wheelOffset = React.useRef(0)

  const bind = useWheel(
    ({ delta: [, dy] }) => {
      wheelOffset.current -= dy
      if (wheelOffset.current > 0) {
        wheelOffset.current = 0
      }
      if (wheelOffset.current < -rightLimit) {
        wheelOffset.current = -rightLimit
      }
      set({ x: wheelOffset.current })
    },
    {
      domTarget,
      event: { passive: false },
    }
  )

  // to set scroll limit

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

  // to disable right click

  const disableRight = e => {
    e.preventDefault()
  }

  useEffect(bind, [bind])

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

  return (
    <>
      <animated.div ref={domTarget} className="slider">
        <animated.div
          className={`slider__inner ${desktop ? "" : "not-desktop"}`}
          style={{ x, width: slideWidth }}
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
      </animated.div>
      <Modal isShowing={isShowing} hide={toggle} content={imgModal} />
    </>
  )
}

export default Slider
