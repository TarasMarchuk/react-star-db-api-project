import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from "../../services/swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import ErrorBoundry from "../error-boundry/error-boundry";
import DummySwapiService from "../../services/dummy-swapi-service";
import {PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage} from '../pages';
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
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

    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">

              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />

              <Switch>
                <Route exact path="/" render={() => <h2>Welcome to StarDB</h2>} />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetsPage} />
                <Route exact path="/starships" component={StarshipsPage} />
                <Route path="/starships/:id"
                       render={({match}) => {
                         const { id } = match.params;
                         return <StarshipDetails itemId={id} />
                       }} />
                <Route path="/login"
                       render={() =>
                         (<LoginPage isLoggedIn={isLoggedIn}
                                     onLogin={this.onLogin} />)
                       } />
                <Route path="/secret"
                       render={() =>
                         (<SecretPage isLoggedIn={isLoggedIn} />)
                       } />

                <Route render={() => <h2>Page not found</h2>} />
              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};