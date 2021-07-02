import React from 'react';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';
import RegionPage from './pages/Region';
import RegionDex from './pages/RegionDex';
// import Types from './pages/Types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Pokedex} />
        <Route path='/regions' render={(props) => <RegionDex {...props} />} />
        <Route path='/regions/:regionId' render={(props) => <RegionPage {...props} />} />
        <Route path='/pokemon/:pokemonId' render={(props) => <Pokemon {...props}/>} />
      </Switch>
    </Router>
  );
};

export default App;
