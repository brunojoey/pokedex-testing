import Pokedex from './pages/Pokedex';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Regions from './pages/Regions';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/regions" element={<Regions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;