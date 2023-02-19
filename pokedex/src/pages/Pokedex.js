import { useState, useEffect } from "react";
import pokemonAPI from "../utils/pokemonAPI";
import { toFirstCharUppercase } from "../utils/firstChar";
import "./index.scss";


const Pokedex = (props) => {
  // const { history } = props;
  const [pokedex, setPokedex] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
        const { data } = await pokemonAPI.getAllPokemon();
        const { results } = data;
        const newPokedex = {};
        results.forEach((pokemon, index) => {
          newPokedex[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokedex(newPokedex);
      }
      fetchData();
    }, [pokedex]);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokedex[pokemonId];

    return (
      // <Grid item xs={12} sm={4} key={pokemonId}>
      //   <Card className='pokemonCard' onClick={() => history.push(`/pokemon/${id}`)}>
      //     <CardMedia
      //       className={classes.cardMedia}
      //       image={(sprite)}
      //       style={{ width: "130px", height: "130px" }}
      //     />
      //     <CardContent className={classes.cardContent}>
      //       <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>{" "}
      //     </CardContent>
      //   </Card>
      // </Grid>


      <div className="pokedex-card" key={pokemonId}>
        <img src={sprite} alt={name}/>
        <h3>{`${id}. ${toFirstCharUppercase(name)}`}</h3>
      </div>
    );
  }; 

  return (
    <>
      {pokedex ? (
        <div className="pokedex">
          {Object.keys(pokedex).map(
            (pokemonId) => {
              return getPokemonCard(pokemonId);
            }
          )}
        </div>
      ):
      <h1>No Pokemon Were Found</h1>}
    </>
  )
};

export default Pokedex;