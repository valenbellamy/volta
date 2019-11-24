import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Content from "../components/Projet/Content"

import Slider from "../components/Projet/Slider"

const Projet = () => (
  <Layout>
    <SEO title="Projet Volta" />
    <main className="project">
      <Slider />
      <Content />
    </main>
  </Layout>
)

export default Projet
