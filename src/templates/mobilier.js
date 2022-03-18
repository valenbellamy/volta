import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Content from "../components/Mobilier/Content"
import Smartphone from "../components/Mobilier/Smartphone"

import SliderProjet from "../components/Projet/SliderProjet"

export const query = graphql`
  query($slug: String!) {
    contentfulMobilier(slug: { eq: $slug }) {
      titre
      collection
      objet
      materiaux
      dimensions
      photos {
        id
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }
  }
`

const Mobilier = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.contentfulMobilier.titre} />
      <main className="project">
        <Smartphone info={data.contentfulMobilier} />
        <SliderProjet photos={data.contentfulMobilier.photos} />
        <Content info={data.contentfulMobilier} />
      </main>
    </Layout>
  )
}

export default Mobilier
