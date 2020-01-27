import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, H6 } from "@blueprintjs/core";

const TitleHead = () => {
  const [data, setData] = useState("Retrieving nCoV status...");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://gisanddata.maps.arcgis.com/sharing/rest/content/items/bda7594740fd40299423467b48e9ecf6?f=json"
      );
      setData(result.data.snippet);
    };
    fetchData();
  }, []);

  return (
    <Card
      interactive={true}
      onClick={() => (window.location.href = "https://systems.jhu.edu/")}
    >
      <H6>Novel Coronavirus (2019-nCoV) Cases - Data tracked by JHU CSSE</H6>
      <p className="bp3-text-small bp3-text-muted">{data}</p>
    </Card>
  );
};

export default TitleHead;
