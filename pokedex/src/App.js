import Pokedex from "./pages/Pokedex";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Regions from "./pages/Regions";
import Region from "./pages/Region";
import Pokemon from "./pages/Pokemon";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route
            exact
            path="/pokemon/:pokemonId"
            loader={({ params }) => {
              console.log("params", params.pokemonId);
            }}
            action={({ params }) => {}}
            element={<Pokemon />}
          />
          <Route path="/regions" element={<Regions />} />
          <Route
            exact
            path="/regions/:regionId"
            loader={({ params }) => {
              console.log("params", params.pokemonId);
            }}
            action={({ params }) => {}}
            element={<Region />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
