import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Content from "../components/Home/Content"
import Anim from "../components/Home/Anim"

const IndexPage = () => (
  <Layout>
    <SEO title="Accueil Volta Archi" />
    <Anim />
    <Content />
  </Layout>
)

export default IndexPage
