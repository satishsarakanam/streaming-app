import React, { Component } from "react";
import "../styles/Header.css";
import Menu from "@mui/icons-material/Menu";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.state = {
      open: false,
    };
    this.windowResize = this.windowResize.bind(this);
  }

  toggleDrawer() {
    this.setState((prevState) => ({ open: !prevState.open }));
  }

  windowResize() {
    if (window.innerWidth >= 800) {
      this.setState({
        open: false,
      });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.windowResize);
  }

  render() {
    return (
      <div className="header">
        <section className="title">
          <a href="/">
            <span>DEMO Streaming</span>
          </a>
        </section>
        <section className={`onboard ${this.state.open ? "open" : ""}`}>
          <div className="hamburg">
            <Menu
              onClick={this.toggleDrawer}
              fontSize="large"
              style={{ color: "white" }}
            />
          </div>
          <span>Log in</span>
          <span className="signup">Start your free trail</span>
        </section>
      </div>
    );
  }
}
