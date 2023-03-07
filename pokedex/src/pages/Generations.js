import { useNavigate } from "react-router-dom";
import generationList from "../utils/generationList.js";

const Generations = () => {
  let navigate = useNavigate();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>All Generations</h1>
      <div className="regions">
        {generationList.map((generation) => {
          return (
            <div className="regions-div" key={generation.generationId}>
              <div className="regions-card">
                <div className="regions-card-content">
                  <div className="regions-card-name">
                    <h2>{generation.generation}</h2>
                    <h3>{generation.region}</h3>
                  </div>
                </div>
                <a
                  href={generation.link}
                  className="regions-card-button"
                  onClick={() => navigate(`/generations/${generation.generationId}`)}
                >
                  {`Pokemon from ${generation.generation}`}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Generations;
