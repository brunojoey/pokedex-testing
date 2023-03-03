import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toFirstCharUppercase } from "../utils/firstChar";
import pokemonAPI from "../utils/pokemonAPI";
import { typeColors } from "../utils/typeColors";

const Type = () => {
  const [typePokemon, setTypePokemon] = useState([]);
  let params = useParams();
  const { typeId } = params;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await pokemonAPI.getType(typeId);
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
          border: `3px solid ${typeColors[typeId]}`,
          borderColor: typeColors[typeId],
        }}
        className="type-pokemon-card"
        onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      >
        <img
          src={pokemon.sprite}
          alt={pokemon.pokemon.name}
          style={{ borderColor: typeColors[typeId] }}
        />
        <h3 style={{ color: typeColors[typeId] }}>
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
          color: typeColors[typeId],
        }}
      >
        {toFirstCharUppercase(typeId)} Type Pokemon
      </h1>
      <div className="type-pokemon-list">
        {generateTypePokemon(typePokemon)}
      </div>
    </div>
  );
};

export default Type;
