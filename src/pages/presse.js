import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Content from "../components/Projet/Content"
import Smartphone from "../components/Projet/Smartphone"

import Slider from "../components/Projet/Slider"
import Slider3 from "../components/Projet/Slider3"

export const query = graphql`
  query {
    contentfulPresse {
      titre
      date
      description
      actualites {
        id
        lien
        image {
          id
          description
          fluid {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
        titre
      }
    }
  }
`

const PressePage = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.contentfulPresse.titre} />
      <main className="project">
        <Smartphone info={data.contentfulPresse} />
        <Slider3 actualites={data.contentfulPresse.actualites} />
        <Content info={data.contentfulPresse} />
      </main>
    </Layout>
  )
}

export default PressePage
