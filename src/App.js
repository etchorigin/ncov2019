import React from "react";
import "./App.css";

import TitleHead from "./Components/TitleHead";
import SingaporeStats from "./Components/SingaporeStats";
import InternationalStats from "./Components/InternationalStats";
import GeoComponent from "./Components/GeoComponent";
import Footer from "./Components/Footer";

function App() {
  document.body.className = "bp3-dark";
  return (
    <div className="App">
      <TitleHead />
      <SingaporeStats />
      <InternationalStats />
      <GeoComponent />
      <Footer />
    </div>
  );
}

export default App;
