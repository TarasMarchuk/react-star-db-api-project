import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from "../../services/swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import ErrorBoundry from "../error-boundry/error-boundry";
import DummySwapiService from "../../services/dummy-swapi-service";
import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages';

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">

              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />

              <Route path="/people" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" component={StarshipsPage} />

              {/*
              <PeoplePage />
              <PlanetsPage />
              <StarshipsPage />*/}

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};