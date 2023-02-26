import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import { toFirstCharUppercase } from "../utils/firstChar";
import { typeColors } from "../utils/typeColors";
import pokemonAPI from "../utils/pokemonAPI";

const Pokemon = () => {
  let params = useParams();
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

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
      height,
      weight,
      types,
      sprites,
      location_area_encounters,
    } = pokemon;
    const { front_default } = sprites;
    const { front_shiny } = sprites;

    return (
      <>
        <h1 className="pokeHeader">
          {`${id}.`} {toFirstCharUppercase(name)}
        </h1>
        <div className="pokemonImage">
          <img src={front_default} alt="default sprite" />
          <img src={front_shiny} alt="shiny sprite" />
        </div>
        <div className="pokemonInfoDiv">
          <h2>Pokemon Info</h2>
            <h3>Abilities: </h3>
            <p>{toFirstCharUppercase(abilities[0].ability.name)}</p>

          <h3>Height: </h3> {height}
          <h3>Weight: </h3>
          {weight}
          <h4>Types: </h4>
          {types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            return (
              <div>
                <div className="type-container">
                  <Link
                    href={type.url}
                    key={name}
                    className="type"
                    style={{
                      backgroundColor: typeColors[type.name],
                    }}
                  >
                    {toFirstCharUppercase(`${name}`)}
                  </Link>
                </div>
              </div>
            );
          })}
          <Link to={location_area_encounters}>
            <strong>Locations</strong>
          </Link>
        </div>
      </>
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
          style={{ marginLeft: "40rem", marginTop: "5rem" }}
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
        <div container>
          <div item lg={10} xs={4}>
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
        </div>
      )}
    </>
  );
};

export default Pokemon;
