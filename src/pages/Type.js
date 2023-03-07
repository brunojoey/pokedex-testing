import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toFirstCharUppercase } from "../utils/firstChar";
import { typeColors } from "../utils/typeColors";
import pokemonAPI from "../utils/pokemonAPI";

const Type = () => {
  const [typePokemon, setTypePokemon] = useState([]);
  const navigate = useNavigate();
  let params = useParams();
  const { typeName } = params;

  useEffect(() => {
    async function fetchData() {
      const { data } = await pokemonAPI.getType(typeName);
      const { pokemon } = data;
      let pokemonList = pokemon;
      pokemonList.forEach((element) => {
        element.pokemon.url = element.pokemon.url.slice(0, -1);
        element.id = parseInt(
          element.pokemon.url.substring(
            element.pokemon.url.lastIndexOf("/") + 1
          )
        );
        element.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.id}.png`;
      });
      // order pokemon based on id
      pokemonList.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });

      setTypePokemon(pokemon);

    }
    fetchData();
  });

  const generateTypePokemon = () => {
    return typePokemon.map((pokemon) => (
      <div
        key={pokemon.pokemon.name}
        style={{
          border: `3px solid ${typeColors[typeName]}`,
          borderColor: typeColors[typeName],
          
        }}
        className="type-pokemon-card"
        onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      >
        <img
          src={pokemon.sprite}
          alt={pokemon.pokemon.name}
          style={{ borderColor: typeColors[typeName] }}
        />
        <h3 style={{ color: typeColors[typeName] }}>
          {toFirstCharUppercase(pokemon.pokemon.name)}
        </h3>
      </div>
    ));
  };

  return (
    <div className="">
      <h1
        style={{
          fontSize: "3rem",
          textAlign: "center",
          color: typeColors[typeName],
        }}
      >
        {toFirstCharUppercase(typeName)} Type Pokemon
      </h1>
      <div className="type-pokemon-list">
        {generateTypePokemon(typePokemon)}
      </div>
      <div className="back-home">
          <a
            style={{
              color: "#eaeaea",
            }}
            // variant="contained"
            href="/"
          >
            Back to Pokedex
          </a>
        </div>
    </div>
  );
};

export default Type;
