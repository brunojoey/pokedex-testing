import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pokemonAPI from "../utils/pokemonAPI";
import { typeColors } from "../utils/typeColors";
import { toFirstCharUppercase } from "../utils/firstChar";

const Types = () => {
  const [types, setTypes] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await pokemonAPI.getAllTypes();
      let { results } = data;
      const newList = results;
      newList.splice(18,2); 
      setTypes(newList);
    }
    fetchData();
  });

  return (
    <div>
      <h1>Pokemon Types</h1>
      <div className="type-list">
        {types.map((type) => {
          return (
            <h2
              style={{ backgroundColor: typeColors[type.name] }}
              onClick={() => navigate(`/types/${type.name}`)}
            >
          {`${toFirstCharUppercase(type.name)}`}
            </h2>
          );
        })}
      </div>
    </div>

  );
};

export default Types;
