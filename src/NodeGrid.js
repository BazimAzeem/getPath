import React from "react";
import Node from "./Node";
import "./NodeGrid.css";

var [rows, cols] = getNodeGridDimensions();
export var nodeRefGrid = getNodeRefGrid(rows, cols);
var nodeGrid = getNodeGrid(rows, cols, nodeRefGrid);

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

  let rows = parseInt(screenHeight / nodeWidth - 1);
  let cols = parseInt(screenWidth / nodeWidth);

  return [rows, cols];
}

function getNodeRefGrid(rows, cols) {
  var nodeRefGrid = [];
  for (let row = 0; row < rows; row++) {
    var nodeRefArray = [];
    for (let col = 0; col < cols; col++) {
      let nodeRef = React.createRef();
      nodeRefArray.push(nodeRef);
    }
    nodeRefGrid.push(nodeRefArray);
  }

  return nodeRefGrid;
}

function getNodeGrid(rows, cols, nodeRefGrid) {
  var nodeGrid = [];
  for (let row = 0; row < rows; row++) {
    var nodeArray = [];
    for (let col = 0; col < cols; col++) {
      let node = getNode(row, col, rows, cols, nodeRefGrid[row][col]);
      nodeArray.push(node);
    }
    nodeGrid.push(nodeArray);
  }

  return nodeGrid;
}

function getNode(row, col, rows, cols, nodeRef) {
  let startRow = parseInt(rows / 2);
  let startCol = parseInt(cols / 3);
  let targetRow = parseInt(rows / 2);
  let targetCol = parseInt((2 * cols) / 3);

  let key = row * cols + col;
  let isStart = row === startRow && col === startCol;
  let isTarget = row === targetRow && col === targetCol;

  let node = (
    <Node
      key={key}
      row={row}
      col={col}
      isStart={isStart}
      isTarget={isTarget}
      ref={nodeRef}
    ></Node>
  );

  return node;
}

var searchTimeDelay = 5;
var pathTimeDelay = 20;

export function visualizeSearch(searchAlgorithm) {
  return new Promise((resolve) => {
    var visitedNodeRefs = searchAlgorithm(nodeRefGrid);
    for (let i = 0; i <= visitedNodeRefs.length; i++) {
      if (i === visitedNodeRefs.length)
        setTimeout(() => {
          resolve(visitedNodeRefs[i - 1]);
        }, searchTimeDelay * i);
      else {
        setTimeout(() => {
          visitedNodeRefs[i].current.setState({ isVisited: true });
        }, searchTimeDelay * i);
      }
    }
  });
}

export function visualizePath(targetNodeRef) {
  return new Promise((resolve) => {
    var pathNodeRefs = [];
    var currentNodeRef = targetNodeRef;
    while (!currentNodeRef.current.state.isStart) {
      pathNodeRefs.push(currentNodeRef);
      currentNodeRef = currentNodeRef.current.predecessor;
    }
    pathNodeRefs.push(currentNodeRef);
    pathNodeRefs.reverse();

    for (let i = 0; i <= pathNodeRefs.length; i++) {
      if (i === pathNodeRefs.length)
        setTimeout(() => {
          resolve(pathNodeRefs);
        }, pathTimeDelay * i);
      else {
        setTimeout(() => {
          pathNodeRefs[i].current.setState({ isVisited: false, isPath: true });
        }, pathTimeDelay * i);
      }
    }
  });
}

export function clearWalls() {
  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      if (nodeRef.current.state.isWall) nodeRef.current.toggleWall();
    }
  }
}
export function clearSearchAndPath() {
  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      nodeRef.current.resetVisitedAndPath();
    }
  }
}
