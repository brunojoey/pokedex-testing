import React, { useEffect, useState } from "react";
import {
  Typography,
  Link,
  CircularProgress,
  Button,
  Grid,
} from "@material-ui/core";
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
        console.log('Response From API', data);
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
        <Typography variant="h3" className="pokeHeader" style={{marginBottom: '.5em'}}>
          {`${id}.`} {toFirstCharUppercase(name)}
        </Typography>
        <div className="pokemonImage" style={{marginBottom: '1em', width: '50%'}}>
          <img style={{ width: "0 auto", height: "0 auto" }} src={front_default} alt='default sprite'/>
          <img style={{ width: "0 auto", height: "0 auto" }} src={front_shiny} alt='shiny sprite'/>
        </div>
        <div className="pokemonInfoDiv" style={{marginBottom: '1em', width: '50%'}}>
          <Typography variant="h5" style={{textDecoration: 'underline'}}>Pokemon Info</Typography>
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
              <Grid container spacing={3} style={{justifyContent: 'center', marginTop: '.1em', marginBottom: '.1em'}}>
                <Grid item xs={8} lg={8} className='cardTypeContainer'>
                <Link
                  href={type.url}
                  key={name}
                  className="cardType"
                  style={{
                    backgroundColor: typeColors[type.name],
                    color: "white",
                    width: "25%",
                  }}
                >
                  {toFirstCharUppercase(`${name}`)}
                </Link>
                </Grid>
              </Grid>

            );
          })}
          <Link href={location_area_encounters}><strong>Locations</strong></Link>
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
        <Grid container>
          <Grid item lg={10} xs={4}>
            <Button
              style={{
                backgroundColor: "#FF4236",
                color: "#dcdcdc",
                float: 'right'
              }}
              // variant="contained"
              onClick={() => history.push("/pokedex-testing/")}
            >
              Back to Pokedex
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default Pokemon;
