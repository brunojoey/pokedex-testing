import React from 'react';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';
import RegionPage from './pages/Region';
import RegionDex from './pages/RegionDex';
// import Types from './pages/Types';
import { Route, Switch } from 'react-router-dom';

const App = (props) => {

  return (
    <Switch>
      <Route exact path='/pokedex-testing/' component={Pokedex} />
      <Route exact path='/pokedex-testing/regions' render={(props) => <RegionDex {...props} />} />
      <Route exact path='/pokedex-testing/regions/:regionId' render={(props) => <RegionPage {...props} />} />
      <Route exact path='/pokedex-testing/pokemon/:pokemonId' render={(props) => <Pokemon {...props}/>} />
    </Switch>
  );
};

export default App;
