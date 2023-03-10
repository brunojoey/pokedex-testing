import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { toFirstCharUppercase } from "../utils/firstChar";
import pokemonAPI from "../utils/pokemonAPI";
import "./index.scss";

const Generation = () => {
  const [pokemon, setPokemon] = useState();
  const [generation, setGeneration] = useState();
  let navigate = useNavigate();
  let params = useParams();
  const { generationId } = params;

  useEffect(() => {
    async function fetchData() {
      const { data } = await pokemonAPI.getRegion(generationId);
      let pokemonList = data.pokemon_species;
      pokemonList.forEach((element) => {
        element.url = element.url.slice(0, -1);
        element.id = parseInt(
          element.url.substring(element.url.lastIndexOf("/") + 1)
        );
        element.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.id}.png`;
      });
      // order pokemon based on id
      pokemonList.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
      setPokemon(pokemonList);
      setGeneration(data);
    }
    fetchData();
  }, [generationId]);

  const getGenerationCard = (generationId) => {
    const { name } = generationId;

    return (
      <div>
        <h1 className="region-header" style={{ textAlign: "center" }}>
          {`${toFirstCharUppercase(name)}`}'s Pokemon
        </h1>
        <div className="regionList-container">
          {pokemon.map((pokemonData) => (
            <div key={pokemonData.name}>
              <div
                key={pokemonData.id}
                className="pokemonCard-region"
                onClick={() => navigate(`/pokemon/${pokemonData.id}`)}
              >
                <img
                  alt="default sprite"
                  src={pokemonData.sprite}
                  style={{ width: "130px", height: "130px" }}
                  />
                  <h3>{`${pokemonData.id}. ${toFirstCharUppercase(
                    pokemonData.name
                  )}`}</h3>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* 1. regionData = undefined, that means we are getting the info
        -> return loading progress */}
      {generation === undefined && (
        <div className="loader">
          <BallTriangle
            type="Circles"
            color="#FF4236"
            height={128}
            width={128}
            timeout={3000}
            style={{ marginLeft: "40rem", marginTop: "5rem" }}
          />
        </div>
      )}
      {/* 2. regionData = good data, that means we've gotten info
        -> return pokemon info */}
      {generation !== undefined && generation && getGenerationCard(generation)}
      {/* 3. region = bad data, that means no info has been found
        -> return region not found */}
      {generation === false && <h1> Region Not Found</h1>}
      {/* 4. Show button for going back to home page. */}
      {generation !== undefined && (
        <div className="back-home">
          <a
            style={{
              color: "#eaeaea",
            }}
            // variant="contained"
            href="/"
          >
            Back to Pokedex
          </a>
        </div>
      )}
    </div>
  );
};

export default Generation;
