import React from "react";
import NodeGrid from "./node grid/NodeGrid";
import NavBar from "./ui/NavBar";
import Introduction from "./ui/Introduction";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <NodeGrid />
      <Introduction />
    </div>
  );
}

export default App;
