import React, { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./services/pokemon";
import Card from './components/Card';
import Navbar from './components/Navbar';
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon/?limit=21&offset=21";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
    console.log("Pokemon", _pokemonData);
  };

  const nextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl)
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const previousPage = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl)
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  return (
    <div className="App">
      {loading ? (
        <h1>Pokemon are Loading...</h1>
      ) : (
        <>
        <Navbar />
          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
          <div className='btn'>
            <button onClick={previousPage}>Previous Page</button>
            <button onClick={nextPage}>Next Page</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
