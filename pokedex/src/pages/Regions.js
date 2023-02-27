import { useNavigate } from "react-router-dom";
import regionInfo from "../utils/regionList.js";
import "./index.scss";

const Regions = () => {
  let navigate = useNavigate();

  return (
    <>
      <h1 style={{textAlign: "center"}}>All Regions</h1>
      {regionInfo.map((region) => {
        return (
          <div className="regions" key={region.regionId}>
            <div className="regions-card">
              <div
                className="regions-card-content"
                style={{
                  backgroundImage: `url(${region.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100%",
                }}
              >
                <div className="regions-card-name">
                  <h2>{region.regionName}</h2>
                </div>
                {/* <img
                className="regions-card-image"
                src={region.image}
                alt={region.regionName}
              /> */}
              </div>
                <a
                  href={region.link}
                  className="regions-card-button"
                  onClick={() => navigate(`/regions/${region.regionId}`)}
                >
                  {`Pokemon from ${region.regionName}`}
                </a>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Regions;
