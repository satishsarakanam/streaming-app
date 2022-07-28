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

    this.state = {
      loading: true,
      populars: {},
    };
  }

  componentDidMount() {
    setTimeout(() => {
      let populars = {};
      for (var item of movies.entries) {
        if (!populars[item.programType]) {
          populars[item.programType] = [];
        }
        populars[item.programType].push(item);
      }
      this.setState({
        populars,
        loading: false,
      });
    }, 0);
  }

  render() {
    const { populars } = this.state;
    console.log(populars);
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
              <Route
                exact
                path="/popular/:name"
                render={() => <PopularList populars={populars} />}
              ></Route>
              <Route path="/:path" render={() => <Error />}></Route>
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}
