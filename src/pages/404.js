import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: La page est introuvable" />
    <div className="error">
      <div>
        <h1>OUPS</h1>
        <p>Cette page n'existe pas</p>
        <Link to="/">Revenir à la page d'accueil</Link>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
