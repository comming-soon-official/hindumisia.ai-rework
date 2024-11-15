import React from "react";
import HomePage from "./pages/home";
import { DataInit } from "./store/init";
import { ThemeProvider } from "./components/theme/ThemeProvider";

const App = () => {
  const { error, loading } = DataInit();
  return (
    <ThemeProvider defaultTheme="system">
      <div>
        {!loading && <HomePage />}
        <div>{error}</div>
      </div>
    </ThemeProvider>
  );
};

export default App;
