import React, { useState, useEffect } from "react";
import Map from "pigeon-maps";
import Overlay from "pigeon-overlay";
import axios from "axios";
import { Card, H6, HTMLTable, Spinner, Intent } from "@blueprintjs/core";
import "../App.css";

import AppToaster from "./AppToaster";

const GeoComponent = () => {
  const [mapCenter, setMapCenter] = useState([1.3521, 103.8198]);
  const [tableData, setTableData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [maxCases, setMaxCases] = useState(100);

  useEffect(() => {
    const fetchTableData = async () => {
      const resultTable = await axios(
        "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=100&cacheHint=true"
      );
      setTableData(resultTable.data.features);
    };
    const fetchMapData = async () => {
      const resultMap = await axios(
        "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=1000&cacheHint=true"
      );
      setMapData(resultMap.data.features);
      setMaxCases(resultMap.data.features[0].attributes.Confirmed);
    };

    fetchTableData();
    fetchMapData();
  }, []);

  const calculateRing = cases => {
    const ringPercent = (cases / maxCases) * 100;
    if (ringPercent < 20.0) {
      return 20;
    } else if (ringPercent < 40.0) {
      return 40;
    } else if (ringPercent < 80.0) {
      return 80;
    }
    return 100;
  };

  return (
    <div className="Geo-Container">
      <Card className="Statistics-Card-Space">
        {tableData.length === 0 ? (
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        ) : (
          <HTMLTable condensed interactive>
            <thead>
              <tr>
                <th>Country</th>
                <th>Cases</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(country => (
                <tr
                  onClick={() =>
                    setMapCenter([
                      country.attributes.Lat,
                      country.attributes.Long_
                    ])
                  }
                >
                  <td>{country.attributes.Country_Region}</td>
                  <td>{country.attributes.Confirmed}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        )}
      </Card>
      <Card className="Statistics-Card">
        {mapData.length === 0 ? (
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        ) : (
          <Map center={mapCenter} zoom={4}>
            {mapData.map(country => {
              const ring = calculateRing(country.attributes.Confirmed);
              const ringHalf = Math.round(ring / 2);

              return (
                <Overlay
                  anchor={[country.attributes.Lat, country.attributes.Long_]}
                  offset={[ringHalf, ringHalf]}
                >
                  <img
                    src="https://i.ya-webdesign.com/images/red-circle-outline-png-5.png"
                    width={ring}
                    height={ring}
                    alt=""
                    onClick={() =>
                      AppToaster.show({
                        message: (
                          <div className="Toaster-Container">
                            <H6>
                              {country.attributes.Province_State
                                ? `${country.attributes.Province_State}, ${country.attributes.Country_Region}`
                                : country.attributes.Country_Region}
                            </H6>
                            <div className="Toaster-Row-Container">
                              <span>Confirmed Case:</span>
                              <span>
                                {country.attributes.Confirmed
                                  ? country.attributes.Confirmed
                                  : 0}
                              </span>
                            </div>
                            <div className="Toaster-Row-Container">
                              <span>Deaths:</span>
                              <span>
                                {country.attributes.Deaths
                                  ? country.attributes.Deaths
                                  : 0}
                              </span>
                            </div>
                            <div className="Toaster-Row-Container">
                              <span>Recovered:</span>
                              <span>
                                {country.attributes.Recovered
                                  ? country.attributes.Recovered
                                  : 0}
                              </span>
                            </div>
                          </div>
                        ),
                        intent: Intent.DANGER
                      })
                    }
                  />
                </Overlay>
              );
            })}
          </Map>
        )}
      </Card>
    </div>
  );
};

export default GeoComponent;
