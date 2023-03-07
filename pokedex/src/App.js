import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";
import Generations from "./pages/Generations";
import Generation from "./pages/Generation";
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
          <Route path="/generations" element={<Generations />} />
          <Route
            exact
            path="/generations/:generationId"
            loader={({ params }) => {
              console.log("params", params.generationId);
            }}
            action={({ params }) => {}}
            element={<Generation />}
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
