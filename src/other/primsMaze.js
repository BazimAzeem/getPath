import { nodeRefGrid } from "../node grid/NodeGrid";
import { isVisualizing } from "../ui/NavBar";

var mazeTimeDelay = 75;

export async function visualizeMaze(mazeAlgorithm) {
  var visitedNodeRefDiagonals = mazeAlgorithm(nodeRefGrid);
  var visitedNodeRefDiagonals = invertMaze(nodeRefGrid);
  await iterateMaze(0, visitedNodeRefDiagonals);
}

function iterateMaze(i, visitedNodeRefDiagonals) {
  return new Promise((resolve) => {
    if (isVisualizing && i < visitedNodeRefDiagonals.length) {
      setTimeout(async () => {
        for (const visitedNodeRef of visitedNodeRefDiagonals[i])
          if (
            !visitedNodeRef.current.state.isStart &&
            !visitedNodeRef.current.state.isTarget
          )
            visitedNodeRef.current.toggleWall();
        i++;
        await iterateMaze(i, visitedNodeRefDiagonals);
        resolve();
      }, mazeTimeDelay);
    } else resolve();
  });
}

function invertMaze(nodeRefGrid) {
  var rows = nodeRefGrid.length;
  var cols = nodeRefGrid[0].length;
  var visitedNodeRefDiagonals = [];
  for (var col = 0; col < cols + rows; col++) {
    var visitedNodeRefDiagonal = [];
    for (
      var row = col < cols ? 0 : col - cols + 1;
      col - row >= 0 && row < rows;
      row++
    ) {
      if (nodeRefGrid[row][col - row].current.isVisited) {
        nodeRefGrid[row][col - row].current.isVisited = false;
      } else {
        visitedNodeRefDiagonal.push(nodeRefGrid[row][col - row]);
      }
    }
    visitedNodeRefDiagonals.push(visitedNodeRefDiagonal);
  }

  return visitedNodeRefDiagonals;
}

export function primsMaze(nodeRefGrid) {
  var randomMazeStartNodeRef =
    nodeRefGrid[getRandIndex(nodeRefGrid)][getRandIndex(nodeRefGrid[0])];
  randomMazeStartNodeRef.current.isVisiting = true;
  var visitingNodeRefs = [randomMazeStartNodeRef];

  var visitedNodeRefs = [];

  while (visitingNodeRefs.length > 0) {
    var visitingNodeRef = visitingNodeRefs.splice(
      getRandIndex(visitingNodeRefs),
      1
    )[0];
    visitingNodeRef.current.isVisiting = false;

    var connectedNodeRefs;
    var unconnectedNodeRefs;
    [connectedNodeRefs, unconnectedNodeRefs] = getMazeNodeRefChildren(
      visitingNodeRef,
      nodeRefGrid
    );

    if (!visitingNodeRef.current.isVisited) {
      if (connectedNodeRefs.length > 0) {
        var randomConnectedNodeRef =
          connectedNodeRefs[getRandIndex(connectedNodeRefs)];
        visitedNodeRefs = connectMazeNodeRefs(
          nodeRefGrid,
          visitingNodeRef,
          randomConnectedNodeRef,
          visitedNodeRefs
        );
      } else {
        visitingNodeRef.current.isVisited = true;
        visitedNodeRefs.push(visitingNodeRef);
      }
    }
    for (const nodeRef of unconnectedNodeRefs) {
      if (!nodeRef.current.isVisiting) {
        nodeRef.current.isVisiting = true;
        visitingNodeRefs.push(nodeRef);
      }
    }
  }

  return visitedNodeRefs;
}

function getMazeNodeRefChildren(nodeRef, nodeRefGrid) {
  var row = nodeRef.current.props.row;
  var col = nodeRef.current.props.col;
  var rows = nodeRefGrid.length;
  var cols = nodeRefGrid[0].length;
  var nodeRefChildren = [];

  if (col - 2 >= 0) nodeRefChildren.push(nodeRefGrid[row][col - 2]);
  if (col + 2 < cols) nodeRefChildren.push(nodeRefGrid[row][col + 2]);

  if (row - 2 >= 0) {
    if (col - 1 >= 0) nodeRefChildren.push(nodeRefGrid[row - 2][col - 1]);
    if (col + 1 < cols) nodeRefChildren.push(nodeRefGrid[row - 2][col + 1]);
  }
  if (row + 2 < rows) {
    if (col - 1 >= 0) nodeRefChildren.push(nodeRefGrid[row + 2][col - 1]);
    if (col + 1 < cols) nodeRefChildren.push(nodeRefGrid[row + 2][col + 1]);
  }

  // Separate connected and unconnected
  var connectedNodeRefs = [];
  var unconnectedNodeRefs = [];
  for (const nodeRef of nodeRefChildren) {
    if (nodeRef.current.isVisited) connectedNodeRefs.push(nodeRef);
    else unconnectedNodeRefs.push(nodeRef);
  }

  return [connectedNodeRefs, unconnectedNodeRefs];
}

function connectMazeNodeRefs(
  nodeRefGrid,
  visitingNodeRef,
  randomConnectedNodeRef,
  visitedNodeRefs
) {
  var row1 = visitingNodeRef.current.props.row;
  var col1 = visitingNodeRef.current.props.col;
  var row2 = randomConnectedNodeRef.current.props.row;
  var col2 = randomConnectedNodeRef.current.props.col;

  var connectingRow = Math.floor((row1 + row2) / 2);
  var connectingCol = Math.floor((col1 + col2) / 2);

  nodeRefGrid[connectingRow][connectingCol].current.isVisited = true;
  visitedNodeRefs.push(nodeRefGrid[connectingRow][connectingCol]);

  visitingNodeRef.current.isVisited = true;
  visitedNodeRefs.push(visitingNodeRef);

  return visitedNodeRefs;
}

function getRandIndex(array) {
  return Math.floor(Math.random() * array.length);
}
