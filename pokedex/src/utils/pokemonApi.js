import axios from "axios";

const getAllPokemon = () => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1008?offset=21`);
};

const getPokemon = (pokemonId) => {
 return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
};

const getAbility = (abilityName) => {
  return axios.get(`https://pokeapi.co/api/v2/ability/${abilityName}`)
};

const getAllRegions = () => {
  return axios.get(`https://pokeapi.co/api/v2/region`)
};

const getRegion = (regionId) => {
  return axios.get(`https://pokeapi.co/api/v2/generation/${regionId}`);
}

const getAllTypes = () => {
  return axios.get(`https://pokeapi.co/api/v2/type/`);
}

const getType = (typeId) => {
  return axios.get(`https://pokeapi.co/api/v2/type/${typeId}`)
}

const pokemonExports = {getAllPokemon, getPokemon, getAbility, getAllRegions, getRegion, getAllTypes, getType}

export default pokemonExports;