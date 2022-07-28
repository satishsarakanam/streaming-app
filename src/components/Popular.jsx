/***************************************************************
Popular Component which shows the popular items

Has loading and popular state values and depending on when the data is received and parsed, loading is shown.

Uses React Route to easily route to populars

Author:	Satish Sarakanam
***************************************************************/

import React, { Component } from "react";
import movies from "../json/movies.json";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "../styles/Popular.css";
import PopularList from "./PopularList";
import Card from "./Card";
import Error from "./Error";

export default class Popular extends Component {
  constructor(props) {
    super(props);

    // Initializing the loading as true, so loading is rendered intially
    this.state = {
      loading: true,
      populars: {},
    };
  }

  componentDidMount() {
    let populars = {};
    for (var item of movies.entries) {
      if (!populars[item.programType]) {
        populars[item.programType] = [];
      }
      populars[item.programType].push(item);
    }

    // Set the state when the component is loaded and the data is parsed
    this.setState({
      populars,
      loading: false,
    });
  }

  render() {
    const { populars } = this.state;
    return (
      <div className="main">
        {this.state.loading ? (
          <div className="loading">
            <span>Loading...</span>
          </div>
        ) : (
          <BrowserRouter>
            <div className="popular-title title-header">
              <span>Populars</span>
            </div>
            <div className="items-list">
              {Object.keys(populars).map((key, index) => {
                return (
                  <Link className="populars" key={index} to={`/popular/${key}`}>
                    <Card item={{ title: key }} />
                  </Link>
                );
              })}
            </div>
            <Switch>
              {/* When matched the exact path, render popular list */}
              <Route
                exact
                path="/popular/:name"
                render={() => <PopularList populars={populars} />}
              ></Route>
              {/* On other routes display the Error Component */}
              <Route path="/:path" render={() => <Error />}></Route>
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}
