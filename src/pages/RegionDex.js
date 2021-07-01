import React from "react";
import { Card, CardMedia, CardContent, Grid, Link } from "@material-ui/core";
import regionJSON from "../utils/region.json";
import "./styles.css";

const RegionDex = (props) => {
  const { history } = props;

  return (
    <div className="region-container">
      <h1 style={{ textAlign: "center" }}>All Regions</h1>
      {regionJSON.map((region) => {
        return (
          <Grid container spacing={3} className="grid-container">
            <Grid item xs={8} lg={8} className="grid-item grid-item-center">
              <Card
                style={{ marginBottom: "1em", border: "2px solid #FF4236" }}
              >
                <CardContent>
                  <h2 style={{ textAlign: "center" }}>{region.region_name}</h2>
                </CardContent>
                <CardMedia className="card-media">
                  <img
                    className="region-image"
                    src={region.image}
                    alt={region.region_name}
                  ></img>
                  <Link
                    to={region.link}
                    className="region-button"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      margin: "0 1em 1em 0",
                    }}
                    onClick={() =>
                      history.push(
                        `/regions/${region.region_ID}`
                      )
                    }
                  >
                    Pokemon from this Region
                  </Link>
                </CardMedia>
              </Card>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default RegionDex;
