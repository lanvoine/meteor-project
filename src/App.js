import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/Main";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 830;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return <Main isMobile={width < breakpoint}/>;
}

export default App;
