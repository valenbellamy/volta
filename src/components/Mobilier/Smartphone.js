import React from "react"
import { Link } from "gatsby"
import "./smartphone.scss"

const Smartphone = ({ info }) => {
  return (
    <>
      <div className="info--lg info--visible-lg">
        <div className="info__logo">
          <Link to="/">
            <svg x="0px" y="0px" viewBox="300 450 3800 1250">
              <polygon points="767.3,1482.39 510.3,836.39 330.3,836.39 650.3,1628.39 884.3,1628.39 1204.3,836.39 1024.3,836.39 " />
              <polygon
                points="2852.3,573.39 2682.3,573.39 2682.3,1628.39 2852.3,1628.39 2852.3,993.39 3117.3,993.39 3117.3,836.39 
	2852.3,836.39 "
              />
              <path
                d="M3846.3,836.39V959c-39.19-73.07-133.84-141.61-265-141.61c-232,0-398,187-398,416c0,229,166,416,398,416
	c131.16,0,225.81-68.54,265-141.61v120.61h163v-792H3846.3z M3602.3,1493.39c-140,0-247-119-247-260c0-141,106-260,247-260
	c138,0,244,119,244,260C3846.3,1374.39,3740.3,1493.39,3602.3,1493.39"
              />
              <path
                d="M1672.3,815.39c-229,0-416,187-416,416c0,231,187,418,416,418c232,0,418-187,418-418
	C2090.3,1002.39,1904.3,815.39,1672.3,815.39 M1672.3,1493.39c-138,0-244-120-244-262c0-141,106-260,244-260c141,0,245,119,245,260
	C1917.3,1373.39,1813.3,1493.39,1672.3,1493.39"
              />
              <rect x="2260.3" y="573.39" width="169" height="1055" />
            </svg>
          </Link>
        </div>
        <div className="info__content">
          <div>
            <div className="info__content__title">
              <h1>{info.titre}</h1>
            </div>
          </div>
          <div className="info__content--md">
            {info.collection && (
              <div>
                <span>Collection: {info.collection}</span>
              </div>
            )}
            {info.objet && (
              <div>
                <span>Objet: {info.objet}</span>
              </div>
            )}
            {info.materiaux && (
              <div>
                <span>Materiaux: {info.materiaux}</span>
              </div>
            )}
            {info.dimensions && (
              <div>
                <span>Dimensions: {info.dimensions}</span>
              </div>
            )}
            <div className="mobilier-info">
              <span>
                Édition limitée, signée, numéro de série et certificat
                d'authenticité
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Smartphone
