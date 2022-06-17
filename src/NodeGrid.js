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
  // Crating a temp node to find its width to calculate rows and cols
  let tempNode = document.createElement("div");
  tempNode.classList.add("node");
  document.body.appendChild(tempNode);
  let nodeWidth = tempNode.offsetWidth;
  tempNode.remove();

  let screenWidth = window.screen.availWidth;
  let screenHeight = window.screen.availHeight;

  let rows = screenHeight / nodeWidth + 1;
  let cols = screenWidth / nodeWidth;

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
