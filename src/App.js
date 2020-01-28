import React, { useState, useEffect } from "react";
import * as Api from "./Api";
import "./App.css";

import TitleHead from "./Components/TitleHead";
import SingaporeStats from "./Components/SingaporeStats";
import InternationalStats from "./Components/InternationalStats";
import GeoComponent from "./Components/GeoComponent";
import TrendsComponent from "./Components/TrendsComponent";
import Footer from "./Components/Footer";

const App = () => {
  // States
  const [updated, setUpdated] = useState("");
  const [sgData, setSGData] = useState({});
  const [totalCases, setTotalCases] = useState(null);
  const [totalDeaths, setTotalDeaths] = useState(null);
  const [totalRecovered, setTotalRecovered] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    Api.fetchResultCases(setTotalCases);
    Api.fetchResultDeaths(setTotalDeaths);
    Api.fetchResultRecovered(setTotalRecovered);
    Api.fetchTableData(setTableData, setSGData, setUpdated);
    Api.fetchMapData(setMapData);
    Api.fetchStatsData(setStatsData);
  }, []);

  document.body.className = "bp3-dark";
  return (
    <div className="App">
      <TitleHead data={updated} />
      <SingaporeStats data={sgData} />
      <InternationalStats
        totalCases={totalCases}
        totalDeaths={totalDeaths}
        totalRecovered={totalRecovered}
      />
      <GeoComponent tableData={tableData} mapData={mapData} />
      <TrendsComponent data={statsData} />
      <Footer />
    </div>
  );
};

export default App;
