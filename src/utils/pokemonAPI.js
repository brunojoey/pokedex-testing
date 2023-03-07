import axios from "axios";

const getAllPokemon = () => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1008?offset=21`);
};

const getPokemon = (pokemonId) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
};

const getPokemonEvolution = (pokemonName) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
};

const getAbility = (abilityName) => {
  return axios.get(`https://pokeapi.co/api/v2/ability/${abilityName}`);
};

const getAllRegions = () => {
  return axios.get(`https://pokeapi.co/api/v2/region`);
};

const getRegion = (regionId) => {
  return axios.get(`https://pokeapi.co/api/v2/generation/${regionId}`);
};

const getAllTypes = () => {
  return axios.get(`https://pokeapi.co/api/v2/type/`);
};

const getType = (typeName) => {
  return axios.get(`https://pokeapi.co/api/v2/type/${typeName}`);
};

const pokemonAPI = {
  getAllPokemon,
  getPokemon,
  getPokemonEvolution,
  getAbility,
  getAllRegions,
  getRegion,
  getAllTypes,
  getType,
};

export default pokemonAPI;
