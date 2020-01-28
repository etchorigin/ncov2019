import React from "react";
import { Card, H1, H4, H6, Spinner, Icon, Intent } from "@blueprintjs/core";
import "../App.css";

const InternationalStats = props => (
  <>
    <div className="Section-Header">
      <H4 className="bp3-text-muted">International</H4>
      <Icon icon="globe" style={{ marginLeft: "8px", marginBottom: "10px" }} />
    </div>
    <div className="Statistics-Container">
      <Card className="Statistics-Card Statistics-Card-Space">
        <H6 className="bp3-text-muted">Total Deaths</H6>
        {props.totalDeaths ? (
          <H1>{props.totalDeaths ? props.totalDeaths.toLocaleString() : 0}</H1>
        ) : (
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        )}
      </Card>
      <Card className="Statistics-Card Statistics-Card-Space">
        <H6 className="bp3-text-muted">Total Confirmed Cases</H6>
        {props.totalCases ? (
          <H1>{props.totalCases ? props.totalCases.toLocaleString() : 0}</H1>
        ) : (
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        )}
      </Card>
      <Card className="Statistics-Card">
        <H6 className="bp3-text-muted">Total Recovered</H6>
        {props.totalRecovered ? (
          <H1>
            {props.totalRecovered ? props.totalRecovered.toLocaleString() : 0}
          </H1>
        ) : (
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        )}
      </Card>
    </div>
  </>
);

export default InternationalStats;
