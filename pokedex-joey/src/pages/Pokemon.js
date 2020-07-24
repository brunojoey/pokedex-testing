import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "../utils/firstChar";
import typeColors from "../utils/typeColors";
import axios from "axios";
import "./styles.css";

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(function (response) {
        const { data } = response;
        console.log(response);
        setPokemon(data);
      })
      .catch(function (error) {
        console.log("ERROR", error);
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemon = (pokemon) => {
    const {
      name,
      id,
      species,
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
        <Typography variant="h3" className="pokemonHeader">
          {`${id}.`} {toFirstCharUppercase(name)}
        </Typography>
        <div className="pokemonImage">
          <img style={{ width: "40em", height: "10em" }} src={front_default} />
          <img style={{ width: "40em", height: "10em" }} src={front_shiny} />
        </div>
        <div className="pokemonInfoDiv">
          <Typography variant="h3">Pokemon Info</Typography>
          <Typography className="pokemonUrl">
            {"Species: "}
            <Link href={species.url}>
              {toFirstCharUppercase(species.name)}{" "}
            </Link>
          </Typography>
          <Typography>Height: {height} </Typography>
          <Typography>Weight: {weight} </Typography>
          <Typography variant="h6"> Types:</Typography>
          {types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            console.log("NameType", type);
            return (
              <Button>
                <Link
                  href={type.url}
                  key={name}
                  className="cardType"
                  style={{ backgroundColor: typeColors[type.name], color: 'white' }}
                >
                  {toFirstCharUppercase(`${name}`)}
                </Link>
              </Button>
            );
          })}
          <h3 style={{ textAlign: "center" }}>
            Locations:{" "}
            <Link
              href={location_area_encounters}
            >{`${location_area_encounters}`}</Link>{" "}
          </h3>
        </div>
      </>
    );
  };
  return (
    <>
      {/* 1. pokemon = undefined, that means we are getting the info
        -> return loading progress */}
      {pokemon === undefined && (
        <CircularProgress style={{ alignContent: "center" }} />
      )}
      {/* 2. pokemon = good data, that means we've gotten info
        -> return pokemon info */}
      {pokemon !== undefined && pokemon && generatePokemon(pokemon)}
      {/* 3. pokemon = bad data, that means no info has been found
        -> return pokemon not found */}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {/* 4. Show button for going back to home page. */}
      {pokemon !== undefined && (
        <Button
          style={{
            backgroundColor: "#FF4236",
            color: "white",
            justifyItems: "center",
          }}
          variant="contained"
          onClick={() => history.push("/")}
        >
          Back to Pokedex
        </Button>
      )}
    </>
  );
};
export default Pokemon;
