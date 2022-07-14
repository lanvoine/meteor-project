import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import DesktopPage from "./components/DesktopPage";
import MobilePage from "./components/MobilePage";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 830;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width < breakpoint ? <MobilePage /> : <DesktopPage />;
}

export default App;
