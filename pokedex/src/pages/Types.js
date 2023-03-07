import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pokemonAPI from "../utils/pokemonAPI";
import { typeList, typeColors } from "../utils/typeColors";
import { toFirstCharUppercase } from "../utils/firstChar";

const Types = () => {
  const [types, setTypes] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await pokemonAPI.getAllTypes();
      let { results } = data;
      const newList = results;
      newList.splice(18, 2);
      newList.forEach((element) => {
        element.url = element.url.slice(0, -1);
        element.id = parseInt(
          element.url.substring(element.url.lastIndexOf("/") + 1)
        );
      });

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
              style={{ backgroundColor: typeColors[type.name], justifyItems: "center" }}
              onClick={() => navigate(`/types/${type.name}`)}
            >
              <img src={typeList[type.id - 1].icon} alt="type icon" width="25px" />
              {`${toFirstCharUppercase(type.name)}`}
            </h2>
          );
        })}
      </div>
    </div>
  );
};

export default Types;
