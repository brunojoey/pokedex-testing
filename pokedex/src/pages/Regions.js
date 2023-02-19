import regionInfo from "../utils/regionList.js";
import "./index.scss";

const Regions = (props) => {
  const { history } = props;

  return (
    <>
      {regionInfo.map((region) => {
        return (
          <div className="regions" key={region.regionId}>
            <div className="regions-card">
              <h2 className="regions-card-name">
                {region.regionName}
              </h2>
              <img
                className="regions-card-image"
                src={region.image}
                alt={region.regionName}
              />
              <a
                href={region.link}
                className="regions-card-button"
                onClick={() => history.push(`/regions/${region.regionId}`)}
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
