import Pokedex from "./pages/Pokedex";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Regions from "./pages/Regions";
import Region from "./pages/Region";
import Pokemon from "./pages/Pokemon";
import Types from "./pages/Types";
import Type from "./pages/Type";
import NotFound from "./pages/NotFound";
import Header from "./componenets/Header";

const App = () => {
  return (
    <div className="App">
      <Router>
          <Header />
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
          <Route path="/generations" element={<Regions />} />
          <Route
            exact
            path="/generations/:regionId"
            loader={({ params }) => {
              console.log("params", params.regionId);
            }}
            action={({ params }) => {}}
            element={<Region />}
          />
          <Route path="/types" element={<Types />} />
          <Route
            exact
            path="/types/:typeName"
            loader={({ params }) => {
              console.log("params", params.typeName);
            }}
            action={({ params }) => {}}
            element={<Type />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
