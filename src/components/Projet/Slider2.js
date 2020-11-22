import React, { useState, useEffect, useLayoutEffect } from "react"
import Img from "gatsby-image"
import "./slider.scss"
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
  const [desktop, setDesktop] = useState(null)
  const [height, setHeight] = useState(null)

  // Scroll

  const isFirefox = React.useRef(typeof InstallTrigger !== "undefined")

  const domTarget = React.useRef(null)
  const [{ x, arrowOpacity }, set] = useSpring(() => ({
    x: 0,
    arrowOpacity: 1,
  }))

  let wheelOffset = React.useRef(0)
  let opacity
  const bind = useWheel(
    ({ delta: [, dy] }) => {
      if (isFirefox.current) {
        dy *= 20
      }
      wheelOffset.current -= dy
      if (wheelOffset.current > 0) {
        wheelOffset.current = 0
      }
      if (wheelOffset.current < -rightLimit) {
        wheelOffset.current = -rightLimit
      }
      opacity = 1 + wheelOffset.current / 400
      if (opacity < 0) {
        opacity = 0
      }
      set({
        x: wheelOffset.current,
        arrowOpacity: opacity,
      })
    },
    {
      domTarget,
      event: { passive: false },
    }
  )

  // to set scroll limit

  const computeSize = isDesktop => {
    let sliderHeight = domTarget.current.clientHeight
    setHeight(sliderHeight)
    let windowWidth = window.innerWidth
    let acc = 0
    let margin = 8
    let gutter = isDesktop ? 16 : 0
    let size = photos.length

    photos.map(photo => {
      var currentWidth
      currentWidth = photo.fluid.aspectRatio * sliderHeight
      return (acc += currentWidth)
    })
    acc += -windowWidth + (size - 1) * margin + 2 * gutter
    setRightLimit(acc)
  }

  // to disable right click
  const disableRight = e => {
    e.preventDefault()
  }

  useEffect(bind, [bind])

  useEffect(() => {
    window.addEventListener("contextmenu", disableRight)
    return () => window.removeEventListener("contextmenu", disableRight)
  })

  useLayoutEffect(() => {
    if (typeof window.orientation !== "undefined") {
      setDesktop(false)
      computeSize(false)
    } else {
      setDesktop(true)
      computeSize(true)
      window.addEventListener("resize", computeSize)
      return () => window.removeEventListener("resize", computeSize)
    }
  }, [])

  return (
    <>
      <animated.div
        ref={domTarget}
        className={`test-slider ${desktop ? "" : "not-desktop"}`}
      >
        <animated.div
          className="test-slider__inner"
          style={{
            x,
          }}
        >
          {photos &&
            photos.map(photo => (
              <div
                className="slider__item"
                key={photo.id}
                style={{
                  width: `${height * photo.fluid.aspectRatio}px`,
                }}
              >
                <Img
                  fluid={photo.fluid}
                  alt={photo.description}
                  backgroundColor="#ccc"
                  onClick={() => {
                    if (window.innerWidth > 768) {
                      toggle()
                      setImgModal(photo.fluid)
                    }
                  }}
                />
              </div>
            ))}
        </animated.div>
        <animated.div
          className={`scroll__arrow ${desktop ? "" : "not-desktop"}`}
          style={{ opacity: arrowOpacity }}
        >
          <svg
            width="118"
            height="119"
            viewBox="0 0 118 119"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 61.3897V57.5082H110.631L55.8786 2.55365L58.6418 0L118 59.6532L58.4371 119L55.8786 116.242L110.631 61.3897H0Z"
              fill="white"
              stroke="white"
            />
          </svg>
        </animated.div>
      </animated.div>
      <Modal isShowing={isShowing} hide={toggle} content={imgModal} />
    </>
  )
}

export default Slider
