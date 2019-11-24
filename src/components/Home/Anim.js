import React, { useEffect, useRef } from "react"
import anime from "animejs/lib/anime.es.js"

const Anim = () => {
  let svgRef = useRef(null)

  useEffect(() => {
    anime
      .timeline()
      .add({
        targets: svgRef,
        d: [
          {
            value: "M 0 0 H 100 V 80 L 0 40",
          },
        ],
        easing: "easeInQuart",
        duration: 600,
        loop: false,
      })
      .add({
        targets: svgRef,
        d: [
          {
            value: "M 0 0 H 100 V 0 L 0 0",
          },
        ],
        easing: "easeOutQuart",
        duration: 600,
        loop: false,
      })
    anime({
      targets: ".morph-wrapper",
      translateY: "-100%",
      duration: 10,
      delay: 1200,
    })
  }, [])
  return (
    <div className="morph-wrapper">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          ref={element => {
            svgRef = element
          }}
          fill="#bbbbbb"
          d="M 0 0 H 100 V 100 L 0 100"
        ></path>
      </svg>
    </div>
  )
}

export default Anim
