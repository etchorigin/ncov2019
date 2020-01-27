import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, H1, H4, H6, Spinner, Intent } from "@blueprintjs/core";
import "../App.css";

const SingaporeStats = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&outSR=102100&resultOffset=0&resultRecordCount=100&cacheHint=true"
      );
      setData(
        result.data.features.find(
          country => country.attributes.Country_Region === "Singapore "
        )
      );
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="Section-Header">
        <H4 className="bp3-text-muted">Singapore</H4>
        <img
          alt="Singapore"
          src="https://image.flaticon.com/icons/svg/197/197496.svg"
          width="16"
          style={{ marginLeft: "8px", marginBottom: "10px" }}
        />
      </div>

      <div className="Statistics-Container">
        <Card className="Statistics-Card Statistics-Card-Space">
          <H6 className="bp3-text-muted">Confirmed Cases</H6>
          {"attributes" in data ? (
            <H1>{data.attributes.Confirmed ? data.attributes.Confirmed : 0}</H1>
          ) : (
            <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
          )}
        </Card>

        <Card className="Statistics-Card Statistics-Card-Space">
          <H6 className="bp3-text-muted">Recoveries</H6>
          {"attributes" in data ? (
            <H1>{data.attributes.Recovered ? data.attributes.Recovered : 0}</H1>
          ) : (
            <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
          )}
        </Card>
        <Card className="Statistics-Card">
          <H6 className="bp3-text-muted">Deaths</H6>
          {"attributes" in data ? (
            <H1>{data.attributes.Deaths ? data.attributes.Deaths : 0}</H1>
          ) : (
            <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
          )}
        </Card>
      </div>
    </>
  );
};

export default SingaporeStats;
