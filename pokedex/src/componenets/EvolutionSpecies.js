import { useState, useEffect } from "react";
import pokemonAPI from "../utils/pokemonAPI";
import axios from "axios";

const EvolutionSpecies = ({name}) => {
  const [pokemonEvolution, setPokemonEvolution] = useState([]);
  const [thirdEvolution, setThirdEvolution] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let pokemonList = [];
      const { data } = await pokemonAPI.getPokemonEvolution(name)
      .then((response) => {
        let evolution = response.data.evolution_chain;
        axios.get(`${evolution.url}`).then((response) => {
          console.log("response data evolution", response.data)
          // let secondEvolutionOne = response.data.chain.evolves_to[0].species.name;
          // let secondEvolutionTwo = response.data.chain.evolves_to[1].species.name;
          // console.log("first evolution", secondEvolutionOne)
          // console.log("second evolution", secondEvolutionTwo)
          let thirdEvolutionOne = response.data.chain.evolves_to[0].evolves_to[0].species.name;
          let thirdEvolutionThree = response.data.chain.evolves_to[0].evolves_to[1].species.name;
          let thirdEvolutionTwo = response.data.chain.evolves_to[1].evolves_to[0].species.name;
          console.log("first third evolution", thirdEvolutionOne)
          // console.log("second third evolution", thirdEvolutionTwo)
          console.log("third third evolution", thirdEvolutionThree)

          if (thirdEvolutionOne || thirdEvolutionTwo || thirdEvolutionThree) {
            let urlThirdEvolution = response.data.chain.evolves_to[0].evolves_to[0].species.url;
            axios.get(`${urlThirdEvolution}`).then((response) => {
              console.log("response onc", response)
              const { name, id } = response.data;
              console.log("third evolution name", name);
              pokemonList = response.data;
              console.log("console", pokemonList)
              pokemonList.for((element) => {
                element.name = name;
                element.id = id;
                element.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.id}.png`;
              });
              setThirdEvolution(pokemonList);
              console.log("pokemon list", pokemonList);
            })}
          // } else if (secondEvolutionOne || secondEvolutionTwo) {

          // } else {
          //   return null;
          // }
        });
      });
  
      setPokemonEvolution(data);
    }
    fetchData();
  });

  return (
    <div>
      <h3>{pokemonEvolution}</h3>
    </div>
  )
};

export default EvolutionSpecies;