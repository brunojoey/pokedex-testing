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
import './styles.css';

const useStyles = makeStyles(() => ({
  pokedexContainer: {
    marginTop: '1em',
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center"
  }
}));

const RegionPage = (props) => {
  const classes = useStyles();
  console.log("props", props);
  const [regionData, setRegionData] = useState();
  const { match, history } = props;
  const { params } = match;
  const { regionId } = params;

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/generation/${regionId}/`)
      .then(function (response) {
        const { data } = response;
        console.log("data", data);
        setRegionData(data);
      })
      .catch(function (error) {
        setRegionData(false);
      });
  }, [regionId]);

  const getRegionCard = (regionId) => {
    const { main_region, sprite, pokemon_species } = regionId;

    return (
      <div>
        <h3 style={{ textAlign: "center" }}>
          {`${toFirstCharUppercase(main_region.name)}`}'s Pokemon
        </h3>
        <div className='regionList-container'>
        {pokemon_species.map((pokemon) => (
          <Grid container spacing={3} className={classes.pokedexContainer} >
          <Grid className='pokemonList-region'>
            <Card
              // className='pokemonCard-region'
              onClick={() => history.push(pokemon.url)}
            >
              <CardMedia
                className={classes.cardMedia}
                image={sprite}
                style={{ width: "130px", height: "130px" }}
                />
              <CardContent className={classes.cardContent}>
                <Typography>{`${toFirstCharUppercase(
                  pokemon.name
                )}`}</Typography>{" "}
              </CardContent>
            </Card>
          </Grid>
          </Grid>
        ))};
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
