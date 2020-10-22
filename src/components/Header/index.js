import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";

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

function Header(props) {
  console.log('props', props)
  const { filter, setFilter } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    setFilter(event.target.value.toLowerCase());
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
    </div>
  );
}

export default Header;
