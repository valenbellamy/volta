import React, { useLayoutEffect } from "react"
import PropTypes from "prop-types"

import "./reset.css"
import "../fonts/fonts.css"
import "../styles/index.scss"

const Layout = ({ children }) => {
  useLayoutEffect(() => {
    setHeight()
    window.addEventListener("resize", setHeight)
    return () => window.removeEventListener("resize", setHeight)
  }, [])

  const setHeight = () => {
    let vh = window.innerHeight * 0.01
    let vh2 = window.outerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }

  return <>{children}</>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
