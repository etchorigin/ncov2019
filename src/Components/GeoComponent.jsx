import React, { useState } from "react";
import Map from "pigeon-maps";
import Overlay from "pigeon-overlay";
import { Card, H6, HTMLTable, Spinner, Intent } from "@blueprintjs/core";
import "../App.css";

import AppToaster from "./AppToaster";

const GeoComponent = props => {
  const [mapCenter, setMapCenter] = useState([1.3521, 103.8198]);

  const calculateRing = cases => {
    const ringPercent = (cases / props.mapData[0].attributes.Confirmed) * 100;
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
        {props.tableData.length === 0 ? (
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        ) : (
          <HTMLTable condensed interactive>
            <thead>
              <tr>
                <th>Country</th>
                <th>Deaths</th>
                <th>Cases</th>
                <th>Recovered</th>
              </tr>
            </thead>
            <tbody>
              {props.tableData.map(
                country =>
                  country.attributes.Country_Region && (
                    <tr
                      key={country.attributes.Country_Region}
                      onClick={() =>
                        setMapCenter([
                          country.attributes.Lat,
                          country.attributes.Long_
                        ])
                      }
                    >
                      <td>
                        {country.attributes.Country_Region === "Others"
                          ? "Diamond Princess"
                          : country.attributes.Country_Region}
                      </td>
                      <td>{country.attributes.Deaths.toLocaleString()}</td>
                      <td>{country.attributes.Confirmed.toLocaleString()}</td>
                      <td>{country.attributes.Recovered.toLocaleString()}</td>
                    </tr>
                  )
              )}
            </tbody>
          </HTMLTable>
        )}
      </Card>
      <Card className="Statistics-Card">
        {props.mapData.length === 0 || props.tableData.length === 0 ? (
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        ) : (
          <Map center={mapCenter} zoom={4}>
            {props.mapData.map(country => {
              const ring = calculateRing(country.attributes.Confirmed);
              const ringHalf = Math.round(ring / 2);

              return (
                <Overlay
                  key={`${country.attributes.Country_Region},${country.attributes.Province_State}`}
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
                                  ? country.attributes.Confirmed.toLocaleString()
                                  : 0}
                              </span>
                            </div>
                            <div className="Toaster-Row-Container">
                              <span>Deaths:</span>
                              <span>
                                {country.attributes.Deaths
                                  ? country.attributes.Deaths.toLocaleString()
                                  : 0}
                              </span>
                            </div>
                            <div className="Toaster-Row-Container">
                              <span>Recovered:</span>
                              <span>
                                {country.attributes.Recovered
                                  ? country.attributes.Recovered.toLocaleString()
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
