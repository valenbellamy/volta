import React, { useState, useEffect, useLayoutEffect } from "react"
import Img from "gatsby-image"
import "./slider.scss"
import anime from "animejs/lib/anime.es.js"
import { animated, useSpring, config } from "react-spring"
import { useWheel } from "react-use-gesture"

import Modal from "../Modal/Modal"
import useModal from "../Hooks/useModal"

const Slider3 = ({ photos }) => {
  const domTarget = React.useRef(null)

  const [{ x }, set] = useSpring(() => ({ x: 0 }))
  let wheelOffset = React.useRef(0)
  const bind = useWheel(
    ({ delta: [, dy] }) => {
      wheelOffset.current += dy
      if (wheelOffset.current > 0) {
        wheelOffset.current = 0
      }
      if (wheelOffset.current < -1200) {
        wheelOffset.current = -1200
      }
      set({ x: wheelOffset.current })
    },
    {
      domTarget,
      event: { passive: false },
    }
  )

  useEffect(bind, [bind])

  // Modal hooks
  const { isShowing, toggle } = useModal()
  const [imgModal, setImgModal] = useState(null)

  // Scroll and drag hooks
  const [down, setDown] = useState(false)
  const [desktop, setDesktop] = useState(null)
  const [slideWidth, setSlideWidth] = useState("auto")

  const [itemloaded, setItemloaded] = useState(0)

  useLayoutEffect(() => {
    if (typeof window.orientation !== "undefined") {
      setSlideWidth(window.innerWidth - 0)
      setDesktop(false)
    } else {
      setDesktop(true)
      // computeWidth()
      // window.addEventListener("resize", computeWidth)
      // return () => window.removeEventListener("resize", computeWidth)
    }
  }, [])

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

  return (
    <>
      <div ref={domTarget} className={`slider ${down ? "active" : ""}`}>
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
      </div>
      <Modal isShowing={isShowing} hide={toggle} content={imgModal} />
    </>
  )
}

export default Slider3
