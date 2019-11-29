import React from 'react';

import {
  withData,
  withSwapiService,
  withChildFunction,
  compose } from "../hoc-helpers";
import ItemList from "../item-list";


const RenderName = ({name}) => <span>{name}</span>;
const RenderModelAndName = ({name, model}) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  };
};
const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  };
};
const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  };
};

const PersonList = compose(
                    withSwapiService(mapPersonMethodsToProps),
                    withData,
                    withChildFunction(RenderName)
                   )(ItemList);
const PlanetList = compose(
                    withSwapiService(mapPlanetMethodsToProps),
                    withData,
                    withChildFunction(RenderName)
                   )(ItemList);
const StarshipList = compose(
                      withSwapiService(mapStarshipMethodsToProps),
                      withData,
                      withChildFunction(RenderModelAndName)
                     )(ItemList);

export {
  PersonList,
  PlanetList,
  StarshipList
};