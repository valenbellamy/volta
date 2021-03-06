import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Content from "../components/Projet/Content"
import Smartphone from "../components/Projet/Smartphone"

import SliderProjet from "../components/Projet/SliderProjet"

export const query = graphql`
  query($slug: String!) {
    contentfulProjet(slug: { eq: $slug }) {
      titre
      date
      description
      maitrise
      surface
      lieu
      mission
      photos {
        id
        title
        description
        fluid {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }
  }
`

const Projet = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.contentfulProjet.titre} />
      <main className="project">
        <Smartphone info={data.contentfulProjet} />
        <SliderProjet photos={data.contentfulProjet.photos} />
        <Content info={data.contentfulProjet} />
      </main>
    </Layout>
  )
}

export default Projet
