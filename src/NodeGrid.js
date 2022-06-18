import React from "react";
import Node from "./Node";
import "./NodeGrid.css";
import djikstra from "./search algorithms/djikstra";

var [rows, cols] = getNodeGridDimensions();
var nodeGrid = getNodeGrid(rows, cols);

const NodeGrid = () => {
  return (
    <div className="node-grid__wrapper">
      <div className="node-grid">
        {nodeGrid.map((nodeArray) => (
          <div
            key={nodeArray[0].props.row}
            style={{ width: "105%", whiteSpace: "nowrap" }}
          >
            {nodeArray.map((node) => node)}
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

  let rows = parseInt(screenHeight / nodeWidth);
  let cols = parseInt(screenWidth / nodeWidth);

  return [rows, cols];
}

function getNodeGrid(rows, cols) {
  var nodeGrid = [];
  for (let row = 0; row < rows; row++) {
    var nodeArray = [];
    for (let col = 0; col < cols; col++) {
      let node = getNode(row, col, rows, cols);
      nodeArray.push(node);
    }
    nodeGrid.push(nodeArray);
  }

  return nodeGrid;
}

function getNode(row, col, rows, cols) {
  let key = row * cols + col;

  let isStart = false;
  let isTarget = false;
  if (row == parseInt(rows / 2) && col == parseInt(cols / 4)) isStart = true;
  if (row == parseInt(rows / 2) && col == parseInt((3 * cols) / 4))
    isTarget = true;

  let node = (
    <Node
      key={key}
      row={row}
      col={col}
      isStart={isStart}
      isTarget={isTarget}
      isVisited={false}
    ></Node>
  );

  return node;
}

export function visualizeSearch(searchAlgorithm) {
  var visitedNodes = searchAlgorithm(nodeGrid);
  // for (let i = 0; i < visitedNodes.length; i++) {
  //   visitedNodes[i].setState({ isVisited: true });
  // }
}
