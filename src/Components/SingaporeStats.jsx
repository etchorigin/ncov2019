import React from "react";
import { Card, H1, H4, H6, Spinner, Intent } from "@blueprintjs/core";
import "../App.css";

const SingaporeStats = props => (
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
        {"attributes" in props.data ? (
          <H1>
            {props.data.attributes.Confirmed
              ? props.data.attributes.Confirmed.toLocaleString()
              : 0}
          </H1>
        ) : (
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        )}
      </Card>

      <Card className="Statistics-Card Statistics-Card-Space">
        <H6 className="bp3-text-muted">Recoveries</H6>
        {"attributes" in props.data ? (
          <H1>
            {props.data.attributes.Recovered
              ? props.data.attributes.Recovered.toLocaleString()
              : 0}
          </H1>
        ) : (
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        )}
      </Card>
      <Card className="Statistics-Card">
        <H6 className="bp3-text-muted">Deaths</H6>
        {"attributes" in props.data ? (
          <H1>
            {props.data.attributes.Deaths
              ? props.data.attributes.Deaths.toLocaleString()
              : 0}
          </H1>
        ) : (
          <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD} />
        )}
      </Card>
    </div>
  </>
);

export default SingaporeStats;
