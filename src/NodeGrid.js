import React from "react";
import Node from "./Node";
import "./NodeGrid.css";

const NodeGrid = () => {
  var [rows, cols] = getNodeGridDimensions();
  var nodeGrid = getNodeGrid(rows, cols);

  return (
    <div className="node-grid__wrapper">
      <div className="node-grid">
        {nodeGrid.map((nodeArray) => (
          <div
            key={nodeArray[0].row}
            style={{ width: "105%", whiteSpace: "nowrap" }}
          >
            {nodeArray.map((node) => (
              <Node key={node.id} isVisted={node.isVisited}></Node>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeGrid;

function getNodeGridDimensions() {
  let screenWidth = window.screen.availWidth;
  console.log("screenWidth: " + screenWidth);
  let screenHeight = window.screen.availHeight;
  console.log("screenHeight: " + screenHeight);

  let rows = 20;
  let cols = 50;

  return [rows, cols];
}

function getNodeGrid(rows, cols) {
  var nodeGrid = [];
  for (let curRow = 0; curRow < rows; curRow++) {
    var nodeArray = [];
    for (let curCol = 0; curCol < cols; curCol++) {
      let node = {
        id: curRow * cols + curCol,
        row: curRow,
        col: curCol,
        isVisited: false,
      };
      nodeArray.push(node);
    }
    nodeGrid.push(nodeArray);
  }

  return nodeGrid;
}
