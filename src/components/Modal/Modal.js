import React from "react"
import ReactDOM from "react-dom"
import Img from "gatsby-image"
import "./modal.scss"

const Modal = ({ isShowing, hide, content }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={`modal-overlay ${isShowing ? "visible" : ""}`} />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <Img
                fluid={content}
                imgStyle={{
                  width: "auto",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
            {/* <div className="modal-header"> */}

            {/* </div> */}
          </div>
          <button
            type="button"
            className="modal-close-button"
            data-dismiss="modal"
            aria-label="Close"
            onClick={hide}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </React.Fragment>,
        document.body
      )
    : null

export default Modal
