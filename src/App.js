import React from "react";
import "./App.css";

import PeoplePage from "./pages/PeoplePage";
import LunchGroup from "./pages/LunchGroupPage";

const App = () => {
  return (
    <div>
      <h1 className="title">Let's make Random Lunch Groups!</h1>
      <div className="container">
        <PeoplePage />
        <LunchGroup />
      </div>
    </div>
  );
};

export default App;
