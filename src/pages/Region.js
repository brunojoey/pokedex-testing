import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
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
  const [filter, setFilter] = useState('');
  const { match, history } = props;
  const { params } = match;
  const { regionId } = params;
  
  const handleChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };
  
  // useEffect(() => {
  //   axios
  //     .get(`https://pokeapi.co/api/v2/pokedex/${regionId}`)
  //     .then(function (response) {
  //       const { data } = response;
  //       console.log('hello', data);
  //       setPokedexData(data);
  //     })
  //     .catch(function (error) {
  //       console.log("ERROR", error);
  //       setPokedexData(false);
  //     });
  // }, [regionId]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/generation/${regionId}/`)
      .then(function (response) {
        const { data } = response;
        // const { main_region } = data;
        const { pokemon_species } = data;
        const newPokemonData = [];
        pokemon_species.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        console.log("data", data);
        setPokemonData(newPokemonData);
        setRegionData(data);
      })
      .catch(function (error) {
        setRegionData(false);
      });
  }, [regionId]);

  const getRegionCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData;
    console.log("pokemonData", pokemonData);

    return (
      <div>
        <h3 style={{ textAlign: "center" }}>
          {`${toFirstCharUppercase(regionData.main_region.name)}`}'s Pokemon
        </h3>
        <div className="regionList-container">
          <Grid
            container
            spacing={3}
            className={classes.pokedexContainer}
            key={name}
          >
            <Grid className="pokemonList-region">
              <Card
                // className='pokemonCard-region'
                onClick={() => history.push(`/pokedex-testing/pokemon/${id}`)}
              >
                <CardMedia
                  className={classes.cardMedia}
                  image={sprite}
                  style={{ width: "130px", height: "130px" }}
                />
                <CardContent className={classes.cardContent}>
                  <Typography>{`${id}. ${toFirstCharUppercase(
                    name
                  )}`}</Typography>{" "}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar
          className={classes.pokemonHeader}
          style={{ backgroundColor: "#FF4236", color: "#dcdcdc" }}
        >
          <div className={classes.searchContainer}>
            <TextField
              label="Search Pokemon"
              variant="standard"
              onChange={handleChange}
            />
          </div>
          <div>
            <Typography>Pokemon App</Typography>
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData && regionData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getRegionCard(regionId)
          )}
        </Grid>
      ) : (
        <CircularProgress style={{ placeItems: "center" }} />
      )}
    </div>
  );
};

export default RegionPage;
