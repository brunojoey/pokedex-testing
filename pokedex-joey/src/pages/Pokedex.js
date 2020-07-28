import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../utils/firstChar";
import './styles.css'

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  pokemonCard: {
    border: '.25em solid red',
    borderRadius: '3em'
  },
  pokemonHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchContainer: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    padding: ".5em 1em .5em 1em",
    margin: "5px 0px",
  },
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  // const next = async () => {
  //   setLoading(true);
  //   let data = await getAllPokemon(nextUrl);
  //   await loadPokemon(data.results);
  //   setNextUrl(data.next);
  //   setPrevUrl(data.previous);
  //   setLoading(false);
  // }

  // const prev = async () => {
  //   if (!prevUrl) return;
  //   setLoading(true);
  //   let data = await getAllPokemon(prevUrl);
  //   await loadPokemon(data.results);
  //   setNextUrl(data.next);
  //   setPrevUrl(data.previous);
  //   setLoading(false);
  // }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807?offset=21`)
      .then(function (response) {
        console.log('response', response)
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={12} sm={4} key={pokemonId}>
        <Card className={classes.pokemonCard} onClick={() => history.push(`/pokedex-testing/${id}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>{" "}
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.pokemonHeader} style={{ backgroundColor: "#FF4236"}}>
          <div className={classes.searchContainer}>
            <TextField
              label="Pokemon"
              variant="standard"
              onChange={handleChange}
            />
          </div>
          <div >
            <Typography >PokemonApp</Typography>
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress style={{alignContent: 'center'}}/>
      )}
    </>
  );
};

export default Pokedex;
