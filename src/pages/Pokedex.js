import React, { useState, useEffect } from "react";
import RegionDex from './RegionDex';
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
  Link,
  TextField
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../utils/firstChar";
import './styles.css';

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    marginTop: '1em',
    width: '100%'
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
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
  rightSideHeader: {
    display: 'flex'
  }
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [nextUrl, setNextUrl] = useState('');
  // const [prevUrl, setPrevUrl] = useState('');
  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    setFilter(event.target.value.toLowerCase());
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

  // Used axios to get the pokemon from the API
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=893?offset=21`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        // will push the information from the results object into newPokemonData with each id, name, and sprite for all.
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

  // renders a card for each pokemon with their given ID, name, and sprite. When clicked, the pokemon's page will show up
  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={12} sm={4} key={pokemonId}>
        <Card className='pokemonCard' onClick={() => history.push(`/pokemon/${id}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={(sprite)}
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
        <Toolbar className='pokemonHeader' style={{ backgroundColor: "#FF4236", color: '#dcdcdc'}}>
          <div className={classes.searchContainer}>
            <TextField
              label="Search Pokemon"
              variant="standard"
              onChange={handleChange}
            />
          </div>
          <div className={classes.rightSideHeader}>
            <Link href={RegionDex} onClick={() => history.push('/regions')}><Typography className='regionLink'>Regions</Typography></Link>
            <Typography style={{ marginLeft: '1em' }}>Pokemon App</Typography>
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
      // If pokemonData exists, the Grid container will render along with all pokemon cards that are filtered in through the search bar if anything is there.
      // If there is nothing in the search bar, it will show every pokemon in the API. 
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        // if pokemonData doesn't exist yet, a loading circle will show in the page.
        <CircularProgress style={{placeItems: 'center'}}/>
      )}
    </>
  );
};

export default Pokedex;
