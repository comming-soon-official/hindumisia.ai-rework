import React from "react";
import HomePage from "./pages/home";
import { DataInit } from "./store/init";

const App = () => {
  const { error, loading } = DataInit();
  return (
    <div>
      {!loading && <HomePage />}
      <div>{error}</div>
    </div>
  );
};

export default App;
