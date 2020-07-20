import React from 'react';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';
import { Route, Switch } from 'react-router-dom';


const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Pokedex} />
      <Route exact path='/:pokemonId' render={(props) => <Pokemon {...props} />} />
    </Switch>
  );
};

export default App;
