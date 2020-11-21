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
  const [height, setHeight] = useState(null)

  // useEffect(() => {
  //   if (itemloaded === photos.length) {
  //     anime(
  //       {
  //         targets: ".gatsby-image-wrapper",
  //         opacity: 1,
  //         easing: "linear",
  //         duration: 300,
  //         delay: (el, i) => 100 * i,
  //       },
  //       0
  //     )
  //   }
  // }, [itemloaded])

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

  const computeSize = () => {
    let sliderHeight = domTarget.current.clientHeight
    setHeight(sliderHeight)
    // let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let acc = 0
    let margin = 8
    let gutter = 16
    // let heightInfos
    // if (windowWidth > 1200) {
    //   heightInfos = 210
    // } else if (windowWidth < 1200 && windowWidth > 768) {
    //   heightInfos = 225
    // } else {
    //   heightInfos = 195
    // }

    // let blank = 48
    let size = photos.length

    photos.map(photo => {
      var currentWidth
      // var currentWidth =
      //   photo.fluid.aspectRatio *
      //   (windowHeight - heightInfos - blank - gutter * 2)
      // acc += currentWidth
      currentWidth = photo.fluid.aspectRatio * sliderHeight
      return (acc += currentWidth)
    })
    // acc = acc - windowWidth + (size - 1) * margin + 2 * gutter
    acc += -windowWidth + (size - 1) * margin + 2 * gutter
    setRightLimit(acc)
  }

  // to disable right click
  const disableRight = e => {
    //   e.preventDefault()
  }

  useEffect(bind, [bind])

  useEffect(() => {
    window.addEventListener("contextmenu", disableRight)
    return () => window.removeEventListener("contextmenu", disableRight)
  })

  useLayoutEffect(() => {
    if (typeof window.orientation !== "undefined") {
      setSlideWidth(window.innerWidth - 0)
      setDesktop(false)
    } else {
      setDesktop(true)
      computeSize()
      window.addEventListener("resize", computeSize)
      return () => window.removeEventListener("resize", computeSize)
    }
  }, [])

  return (
    <>
      <animated.div ref={domTarget} className="test-slider">
        <animated.div
          className={`test-slider__inner ${desktop ? "" : "not-desktop"}`}
          style={{
            transform: x.interpolate(x => `translateX(${x}px)`),
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
