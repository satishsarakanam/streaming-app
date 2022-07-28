import React from "react";
import playstore from "../images/playstore.png";
import appstore from "../images/appstore.png";
import windowstore from "../images/windowstore.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import "../styles/Footer.css";

export default function footer() {
  return (
    <footer>
      <section className="footer-links">
        <a href="\">Home</a>
        <a href="\">Terms and Conditions</a>
        <a href="\">Privacy Policy</a>
        <a href="\">Collection Statement</a>
        <a href="\">Help</a>
        <a href="\">Manage Account</a>
      </section>
      <section className="copy-rights">
        <span className="cr">
          Copyright &#169; {new Date().getFullYear()} Demo Streaming. All Rights
          Reserved.
        </span>
      </section>
      <section className="footer-img-links">
        <div className="social-links">
          <a href="\">
            <FacebookIcon />
          </a>
          <a href="\">
            <TwitterIcon />
          </a>
          <a href="\">
            <InstagramIcon />
          </a>
        </div>
        <div className="appstore-links">
          <a href="\">
            <img src={playstore} alt="Google Playstore" />
          </a>
          <a href="\">
            <img src={appstore} alt="Apple Appstore" />
          </a>
          <a href="\">
            <img src={windowstore} alt="Windows Store" />
          </a>
        </div>
      </section>
    </footer>
  );
}
