import React, { useState, useEffect } from "react";
import {
  AppBar, 
  Toolbar, 
  TextField,
  CircularProgress,
  Link,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../utils/firstChar";
import typeColors from "../utils/typeColors";
import axios from "axios";

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
}));


function Types(props) {
  const classes = useStyles();
  const { history } = props;
  const [typeData, setTypeData] = useState();
  // const [filter, setFilter] = useState();

  // const handleClick = (event) => {
  //   setFilter(event.target.value);
  // };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        let pokemonTypes = results.splice(0, 18);
        setTypeData(pokemonTypes);
      })
      .catch(function (error) {
        setTypeData(false);
      });
  }, []);

  const getTypes = (pokemonTypes) => {
    console.log("type data logs", pokemonTypes);
    pokemonTypes.map((types) => {
      console.log("names", types.name);
      console.log("url", types.url);
      return (
        <div>
              <Grid container spacing={3} >
                <Grid item xs={8} lg={8} >
                <Link
                  href={types.url}
                  key={types.name}
                  className="cardType"
                  style={{
                    backgroundColor: typeColors[types.name],
                    color: "white",
                    width: "25%",
                  }}
                  >
                  {console.log('types colors', typeColors[types.name])}
                  {console.log('types url', types.url)}
                  {console.log('types name', types.name)}
                  {toFirstCharUppercase(`${types.name}`)}
                </Link>
                </Grid>
              </Grid>
        </div>
      );
    });
    console.log("more type data logs", pokemonTypes);
  };

  // console.log('function', getTypes(typeData))

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
              // onClick={handleClick}
            />
          </div>
          <div>
            <Typography>Pokemon App</Typography>
          </div>
        </Toolbar>
      </AppBar>
      {/* {typeData ? (
        <Grid container spacing={2}>
          {Object.keys(typeData).map(
            (pokemonTypes) => typeData[pokemonTypes].name.includes(filter) && getTypes(typeData)
          )}
        </Grid>
      ) : (
        <CircularProgress style={{ placeItems: "center" }} />
      )} */}
      {/* 1. type = undefined, that means we are getting the info
        -> return loading progress */}
      {typeData === undefined && (
        <CircularProgress style={{ alignContent: "center" }} />
      )}
      {/* 2. type = good data, that means we've gotten info
        -> return type info */}
      {typeData !== undefined && typeData && getTypes(typeData)}
      {/* 3. type = bad data, that means no info has been found
        -> return type not found */}
      {typeData === false && <Typography> Types not found</Typography>}
      {/* 4. Show button for going back to home page. */}
      {typeData !== undefined && (
        <Grid container>
          <Grid item lg={10} xs={4}>
            <Button
              style={{
                backgroundColor: "#FF4236",
                color: "#dcdcdc",
                float: "right",
              }}
              // variant="contained"
              onClick={() => history.push("/")}
            >
              Back to Pokedex
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Types;
