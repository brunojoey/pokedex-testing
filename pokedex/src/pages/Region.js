import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { toFirstCharUppercase } from "../utils/firstChar";
import pokemonAPI from "../utils/pokemonAPI";
import "./index.scss";

const RegionPage = () => {
  const [pokemon, setPokemon] = useState();
  const [region, setRegion] = useState();
  let params = useParams();
  let navigate = useNavigate();
  const { regionId } = params;

  useEffect(() => {
    async function fetchData() {
      const { data } = await pokemonAPI.getRegion(regionId);
      console.log("data", data);
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
      setRegion(data);
    }
    fetchData();
  }, [regionId]);

  const getRegionCard = (regionId) => {
    console.log("region", regionId);
    const { main_region } = regionId;

    return (
      <div>
        <h1 className="region-header" style={{ textAlign: "center" }}>
          {`${toFirstCharUppercase(main_region.name)}`}'s Pokemon
        </h1>
        <h1 className="region-header" style={{ textAlign: "center" }}>
          Generation IX's Pokemon
        </h1>
        <div className="regionList-container">
          {pokemon.map((pokemonData) => (
            <div key={pokemonData.name}>
              <div
                key={pokemonData.id}
                className="pokemonCard-region"
                onClick={() => navigate(`/pokemon/${pokemonData.id}`)}
              >
                <h3>{`${pokemonData.id}. ${toFirstCharUppercase(
                  pokemonData.name
                )}`}</h3>{" "}
                <img
                  alt="default sprite"
                  src={pokemonData.sprite}
                  style={{ width: "130px", height: "130px" }}
                />
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
      {region === undefined && (
        <BallTriangle
          className="loader"
          type="Circles"
          color="#FF4236"
          height={128}
          width={128}
          timeout={3000}
          style={{ marginLeft: "40rem", marginTop: "5rem" }}
        />
      )}
      {/* 2. regionData = good data, that means we've gotten info
        -> return pokemon info */}
      {region !== undefined && region && getRegionCard(region)}
      {/* 3. region = bad data, that means no info has been found
        -> return region not found */}
      {region === false && <h1> Region Not Found</h1>}
      {/* 4. Show button for going back to home page. */}
      {region !== undefined && (
        <div>
          <Link
            style={{
              backgroundColor: "#FF4236",
              color: "#dcdcdc",
              float: "right",
            }}
            // variant="contained"
            to="/"
          >
            Back to Pokedex
          </Link>
        </div>
      )}
    </div>
  );
};

export default RegionPage;
