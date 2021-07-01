import React, { useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../utils/firstChar";
import axios from "axios";
import "./styles.css";

const useStyles = makeStyles(() => ({
  pokedexContainer: {
    marginTop: "1em",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
}));

const RegionPage = (props) => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState();
  const [regionData, setRegionData] = useState();
  const { match, history } = props;
  const { params } = match;
  const { regionId } = params;

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/generation/${regionId}/`)
      .then(function (response) {
        const { data } = response;
        console.log("Response From API", data);
        let pokemonListRaw = response.data.pokemon_species;
        // add id property to the pokémon for sorting purpose
        pokemonListRaw.forEach((element) => {
          element.url = element.url.slice(0, -1);
          element.id = parseInt(
            element.url.substring(element.url.lastIndexOf("/") + 1)
          );
          element.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            element.id
          }.png`;
        });
        // order pokemon based on id
        pokemonListRaw.sort((a, b) => {
          return a.id > b.id ? 1 : -1;
        });
        setPokemonData(pokemonListRaw);
        console.log("pokemon data new", pokemonListRaw);
        setRegionData(data);
        console.log("Final Set Data", data);
      })
      .catch(function (error) {
        setRegionData("Error", error);
      });
  }, [regionId]);

  const getRegionCard = (regionId) => {
    const { main_region } = regionId;
    const { id, name, sprite } = pokemonData;
    console.log("Data For Each Pokemon Card", pokemonData);

    return (
      <div>
        <h1 className='region-header' style={{ textAlign: "center" }}>
          {`${toFirstCharUppercase(main_region.name)}`}'s Pokemon
        </h1>
        <div className="regionList-container">
          {pokemonData.map((pokemon) => (
            <Grid
              container
              spacing={3}
              className={classes.pokedexContainer}
              key={pokemon.name}
            >
              <Grid className="pokemonList-region">
                <Card
                  className='pokemonCard-region'
                  onClick={() =>
                    history.push(`/pokemon/${pokemon.id}`)
                  }
                >
                  <CardMedia
                    className={classes.cardMedia}
                    image={pokemon.sprite}
                    style={{ width: "130px", height: "130px" }}
                  />
                  <CardContent className={classes.cardContent}>
                  <Typography>{`${pokemon.id}. ${toFirstCharUppercase(
                    pokemon.name
                  )}`}</Typography>{" "}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* 1. regionData = undefined, that means we are getting the info
        -> return loading progress */}
      {regionData === undefined && (
        <CircularProgress style={{ placeItems: "center" }} />
      )}
      {/* 2. regionData = good data, that means we've gotten info
        -> return pokemon info */}
      {regionData !== undefined && regionData && getRegionCard(regionData)}
      {/* 3. region = bad data, that means no info has been found
        -> return region not found */}
      {regionData === false && <Typography> Region not found</Typography>}
    </div>
  );
};

export default RegionPage;
