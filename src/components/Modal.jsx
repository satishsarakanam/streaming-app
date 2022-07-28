import React, { Component } from "react";
import "../styles/Modal.css";
import image from "../images/default.png";
import Button from "@mui/material/Button";
export default class Modal extends Component {
  componentDidMount() {
    document.body.classList.add("modal");
  }

  componentWillUnmount() {
    document.body.classList.remove("modal");
  }

  replaceImage(e) {
    e.target.src = image;
  }

  render() {
    const { programDetails, closePopup } = this.props;

    const { title, description, releaseYear, funcFact, images } =
      programDetails;

    return (
      <section className="modal-window">
        <div className="program-details">
          <img
            src={images["Poster Art"]["url"]}
            onError={this.replaceImage}
            alt="Artwork"
          />
          <span className="hero-title">{title}</span>
          <span className="hero-description">{description}</span>
          <span className="hero-year">{`Release year: ${releaseYear}`}</span>
          <span className="hero-funfact">{`Fun Fact: ${funcFact}`}</span>
          <Button onClick={closePopup} variant="contained" size="large">
            Close
          </Button>
        </div>
      </section>
    );
  }
}
