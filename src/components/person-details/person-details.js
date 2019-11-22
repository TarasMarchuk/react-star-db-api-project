import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import PersonView from "./person-view";

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: {},
    loading: true
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({loading: true});
      this.updatePerson();
    }
  }

  onPersonLoaded = (person) => {
    this.setState({
      person,
      loading: false
    });
  };

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded);
  }

  render() {

    if (!this.state.person) {
      return <span>Select a person from the list</span>
    }

    const { person, loading } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <PersonView person={person} /> : null

    return (
      <div className="person-details card">
        {spinner}
        {content}

      </div>
    )
  }
}