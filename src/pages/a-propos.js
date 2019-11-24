import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Content from "../components/About/Content"

const About = () => (
  <Layout>
    <SEO title="A propos de Volta" />
    <main>
      <Content />
    </main>
  </Layout>
)

export default About
