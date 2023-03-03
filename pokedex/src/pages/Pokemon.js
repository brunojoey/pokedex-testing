import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import AbilityDesc from "../componenets/AbilityDesc";
import { toFirstCharUppercase } from "../utils/firstChar";
import { typeColors } from "../utils/typeColors";
import pokemonAPI from "../utils/pokemonAPI";
import "./index.scss";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(undefined);
  let params = useParams();
  const { pokemonId } = params;
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await pokemonAPI.getPokemon(pokemonId);
      console.log("data", data);
      setPokemon(data);
    }
    fetchData();
  }, [pokemonId]);

  const generatePokemonCard = (pokemon) => {
    const {
      name,
      id,
      abilities,
      types,
      sprites,
      stats,
    } = pokemon;
    const { front_default } = sprites;
    const { front_shiny } = sprites;

    return (
      <div className="pokemon" key={name}>
        <h1 className="pokemon-header">
          {`${id}.`} {toFirstCharUppercase(name)}
        </h1>
        <div className="pokemon-image" key={name}>
          <img src={front_default} alt="default sprite" />
          <img src={front_shiny} alt="shiny sprite" />
        </div>
        <div className="pokemon-info">
          <h2 style={{ textAlign: "center" }}>Pokemon Info</h2>
          <h3>Types: </h3>
          {types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            return (
              <div className="type">
                <div className="type-container">
                  <h3
                    onClick={() => navigate(`/type/${name}`)}
                    key={name}
                    className="type"
                    style={{
                      backgroundColor: typeColors[type.name],
                    }}
                  >
                    {toFirstCharUppercase(`${name}`)}
                  </h3>
                </div>
              </div>
            );
          })}
          <h3>Abilities: </h3>
          {abilities.map((pokemonAbility) => {
            const { ability } = pokemonAbility;
            const { name } = ability;

            return (
              <div className="pokemon-info-abilities" key={name}>
                <h4>{toFirstCharUppercase(name)}</h4>
                <AbilityDesc abilityName={name} />
              </div>
            );
          })}
            <h3>Base Stats: </h3>
          <div className="base-stats">
            {stats.map((pokemonStats) => {
              const { stat } = pokemonStats;
              const { name } = stat;

              return (
                <div className="pokemon-info-stats" key={name}>
                  <h3>{toFirstCharUppercase(name)}</h3>
                  <p>{pokemonStats.base_stat}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {/* 1. pokemon = undefined, that means we are getting the info
          -> return loading progress */}
      {pokemon === undefined && (
        <BallTriangle
          className="loader"
          type="Circles"
          color="#FF4236"
          height={128}
          width={128}
          timeout={3000}
          style={{ justifyContent: "center" }}
        />
      )}
      {/* 2. pokemon = good data, that means we've gotten info
          -> return pokemon info */}
      {pokemon !== undefined && pokemon && generatePokemonCard(pokemon)}
      {/* 3. pokemon = bad data, that means no info has been found
          -> return pokemon not found */}
      {pokemon === false && <h2> Pokemon Not Found</h2>}

      {/* 4. Show button for going back to home page. */}
      {pokemon !== undefined && (
        <div>
          <Link
            style={{
              backgroundColor: "#FF4236",
              color: "#dcdcdc",
              float: "right",
            }}
            // variant="contained"
            to="/"
          >
            Back to Pokedex
          </Link>
        </div>
      )}
    </>
  );
};

export default Pokemon;
