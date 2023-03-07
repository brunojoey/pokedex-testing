import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { toFirstCharUppercase } from "../utils/firstChar";
import { typeList } from "../utils/typeColors";
import pokemonAPI from "../utils/pokemonAPI";
import AbilityDesc from "../componenets/AbilityDesc";
// import EvolutionSpecies from "../componenets/EvolutionSpecies";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(undefined);
  const [typePokemon, setTypePokemon] = useState(undefined);
  let navigate = useNavigate();
  let params = useParams();
  const { pokemonId } = params;

  useEffect(() => {
    async function fetchData() {
      const { data } = await pokemonAPI.getPokemon(pokemonId);
      let typeList = data.types;
      typeList.forEach((element) => {
        element.name = element.type.name;
        element.url = element.type.url.slice(0, -1);
        element.id = parseInt(
          element.url.substring(element.url.lastIndexOf("/") + 1)
        );
      });
      setTypePokemon(typeList);
      setPokemon(data);
    }
    fetchData();
  }, [pokemonId]);

  const generatePokemonCard = (pokemon) => {
    const { name, id, abilities, sprites, stats } = pokemon;
    const { front_default, front_shiny } = sprites;

    return (
      <div className="pokemon" key={name}>
        <h1 className="pokemon-header">
          {`${id}.`} {toFirstCharUppercase(name)}
        </h1>
        <div className="pokemon-info-image" key={name}>
          <img src={front_default} alt="default sprite of Pokemon" />
          <img src={front_shiny} alt="shiny sprite of Pokemon" />
        </div>
        <div className="pokemon-info" key={id}>
          <h3>Types: </h3>
          <div className="pokemon-info-type" key={name}>
            {typePokemon.map((typeInfo) => {
              const { name, id } = typeInfo;
              return (
                <div className="pokemon-info-type-container">
                  <h3
                    onClick={() => navigate(`/types/${name}`)}
                    key={name}
                    className="pokemon-info-type"
                    style={{
                      backgroundColor: typeList[id - 1].color,
                    }}
                  >
                    <img
                      src={typeList[id - 1].icon}
                      alt="type icon"
                      width="25px"
                    />
                    {toFirstCharUppercase(`${name}`)}
                  </h3>
                </div>
              );
            })}
          </div>
          <div className="abilities-stats">
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
                  <div className="pokemon-info-stats" key={stat}>
                    <h3>{toFirstCharUppercase(name)}</h3>
                    <p
                      style={{
                        width: `${pokemonStats.base_stat}px`,
                      }}
                    >
                      {pokemonStats.base_stat}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <EvolutionSpecies name={name}/> */}
        </div>
      </div>
    );
  };
  return (
    <>
      {/* 1. pokemon = undefined, that means we are getting the info
          -> return loading progress */}
      {pokemon === undefined && (
        <div className="loader">
          <BallTriangle
            type="Circles"
            color="#FF4236"
            height={128}
            width={128}
            timeout={3000}
            style={{ justifyContent: "center" }}
          />
        </div>
      )}
      {/* 2. pokemon = good data, that means we've gotten info
          -> return pokemon info */}
      {pokemon !== undefined && pokemon && generatePokemonCard(pokemon)}
      {/* 3. pokemon = bad data, that means no info has been found
          -> return pokemon not found */}
      {pokemon === false && <h2> Pokemon Not Found</h2>}

      {/* 4. Show button for going back to home page. */}
      {pokemon !== undefined && (
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
      )}
    </>
  );
};

export default Pokemon;
