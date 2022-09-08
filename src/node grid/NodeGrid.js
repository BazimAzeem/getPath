import React from "react";
import Node from "./Node";
import "./NodeGrid.css";
import { isVisualizing } from "../ui/NavBar";

var [rows, cols] = getNodeGridDimensions();
export var nodeRefGrid = getNodeRefGrid(rows, cols);

const NodeGrid = () => {
  return (
    <div className="node-grid__wrapper">
      <div className="node-grid">
        {getNodeGrid(rows, cols, nodeRefGrid).map((nodeArray) => (
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

  let rows = parseInt(screenHeight / nodeWidth + 1);
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
  let startCol = parseInt(cols / 4);
  let targetRow = parseInt(rows / 2);
  let targetCol = parseInt((3 * cols) / 4);

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

var searchTimeDelay = 20;
var pathTimeDelay = 40;

export async function visualizeSearch(visitedNodeRefs) {
  await iterateSearch(0, visitedNodeRefs);
}

function iterateSearch(i, visitedNodeRefs) {
  return new Promise((resolve) => {
    if (isVisualizing && i < visitedNodeRefs.length) {
      setTimeout(async () => {
        visitedNodeRefs[i].current.setState({ isVisited: true });
        i++;
        await iterateSearch(i, visitedNodeRefs);
        resolve();
      }, searchTimeDelay);
    } else resolve();
  });
}

export async function visualizePath(pathNodeRefs) {
  if (!isVisualizing) return;
  await iteratePath(0, pathNodeRefs);
  return;
}

function iteratePath(i, pathNodeRefs) {
  return new Promise((resolve) => {
    if (isVisualizing && i < pathNodeRefs.length) {
      setTimeout(async () => {
        pathNodeRefs[i].current.setState({ isVisited: false, isPath: true });
        i++;
        await iteratePath(i, pathNodeRefs);
        resolve();
      }, pathTimeDelay);
    } else resolve();
  });
}

export function clearWallsAndWeights() {
  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      if (nodeRef.current.state.isWall) nodeRef.current.toggleWall();
      else if (nodeRef.current.state.isSmallWeight)
        nodeRef.current.toggleSmallWeight();
      else if (nodeRef.current.state.isMediumWeight)
        nodeRef.current.toggleMediumWeight();
      else if (nodeRef.current.state.isLargeWeight)
        nodeRef.current.toggleLargeWeight();
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

export function resetStartAndTargetNodes() {
  let startRow = parseInt(rows / 2);
  let startCol = parseInt(cols / 4);
  let targetRow = parseInt(rows / 2);
  let targetCol = parseInt((3 * cols) / 4);

  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      var row = nodeRef.current.props.row;
      var col = nodeRef.current.props.col;

      let isStart = row === startRow && col === startCol;
      let isTarget = row === targetRow && col === targetCol;

      nodeRef.current.setState({ isStart: isStart, isTarget: isTarget });
    }
  }
}
