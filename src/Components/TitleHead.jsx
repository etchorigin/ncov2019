import React from "react";
import { Card, H6 } from "@blueprintjs/core";

const TitleHead = props => (
  <Card
    interactive={true}
    onClick={() => (window.location.href = "https://systems.jhu.edu/")}
  >
    <H6>Novel Coronavirus (2019-nCoV) Cases - Data tracked by JHU CSSE</H6>
    <p className="bp3-text-small bp3-text-muted">{props.data}</p>
  </Card>
);

export default TitleHead;
