import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, H1, H4, H6, Spinner, Icon, Intent } from "@blueprintjs/core";
import "../App.css";

const InternationalStats = () => {
  const [totalCases, setTotalCases] = useState(null);
  const [totalDeaths, setTotalDeaths] = useState(null);
  const [totalRecovered, setTotalRecovered] = useState(null);

  useEffect(() => {
    const fetchResultCases = async () => {
      const resultCases = await axios(
        "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
      );
      setTotalCases(resultCases.data.features[0].attributes.value);
    };
    const fetchResultDeaths = async () => {
      const resultDeaths = await axios(
        "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
      );
      setTotalDeaths(resultDeaths.data.features[0].attributes.value);
    };
    const fetchResultRecovered = async () => {
      const resultRecovered = await axios(
        "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
      );
      setTotalRecovered(resultRecovered.data.features[0].attributes.value);
    };

    fetchResultCases();
    fetchResultDeaths();
    fetchResultRecovered();
  }, []);

  return (
    <>
      <div className="Section-Header">
        <H4 className="bp3-text-muted">International</H4>
        <Icon
          icon="globe"
          style={{ marginLeft: "8px", marginBottom: "10px" }}
        />
      </div>
      <div className="Statistics-Container">
        <Card className="Statistics-Card Statistics-Card-Space">
          <H6 className="bp3-text-muted">Total Deaths</H6>
          {totalDeaths ? (
            <H1>{totalDeaths ? totalDeaths : 0}</H1>
          ) : (
            <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
          )}
        </Card>
        <Card className="Statistics-Card Statistics-Card-Space">
          <H6 className="bp3-text-muted">Total Confirmed Cases</H6>
          {totalCases ? (
            <H1>{totalCases ? totalCases : 0}</H1>
          ) : (
            <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
          )}
        </Card>
        <Card className="Statistics-Card">
          <H6 className="bp3-text-muted">Total Recoveries</H6>
          {totalRecovered ? (
            <H1>{totalRecovered ? totalRecovered : 0}</H1>
          ) : (
            <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
          )}
        </Card>
      </div>
    </>
  );
};

export default InternationalStats;
