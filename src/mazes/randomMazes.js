import { nodeRefGrid } from "../node grid/NodeGrid";
import { isVisualizing } from "../ui/NavBar";

var mazeTimeDelay = 75;

// Random Wall Maze
export async function visualizeRandomWallMaze(mazeAlgorithm) {
  var visitedNodeRefs = mazeAlgorithm(nodeRefGrid);
  var visitedNodeRefGroups = groupWallMazeNodes(visitedNodeRefs);
  await iterateRandomWallMaze(0, visitedNodeRefGroups);
}

function iterateRandomWallMaze(i, visitedNodeRefGroups) {
  return new Promise((resolve) => {
    if (isVisualizing && i < visitedNodeRefGroups.length) {
      setTimeout(async () => {
        for (const visitedNodeRef of visitedNodeRefGroups[i])
          if (
            !visitedNodeRef.current.state.isStart &&
            !visitedNodeRef.current.state.isTarget
          )
            visitedNodeRef.current.toggleWall();
        i++;
        await iterateRandomWallMaze(i, visitedNodeRefGroups);
        resolve();
      }, mazeTimeDelay);
    } else resolve();
  });
}

function groupWallMazeNodes(visitedNodeRefs) {
  var visitedNodeRefGroups = [];
  for (let i = 0; i < 40; i++) visitedNodeRefGroups.push([]);
  for (const nodeRef of visitedNodeRefs) {
    var randGroup = randNumInRange(0, visitedNodeRefGroups.length - 1);
    visitedNodeRefGroups[randGroup].push(nodeRef);
  }

  return visitedNodeRefGroups;
}

export function randomWallMaze() {
  var visitedNodeRefs = [];
  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      let rand = Math.random();
      if (rand < 0.33) {
        nodeRef.current.isVisited = true;
        visitedNodeRefs.push(nodeRef);
      }
    }
  }

  return visitedNodeRefs;
}

// Random Weight Maze
export async function visualizeRandomWeightsMaze(mazeAlgorithm) {
  var visitedNodeRefs = mazeAlgorithm(nodeRefGrid);
  var visitedNodeRefGroups = groupWeightsMazeNodes(visitedNodeRefs);
  await iterateRandomWeightsMaze(0, visitedNodeRefGroups);
}

function iterateRandomWeightsMaze(i, visitedNodeRefGroups) {
  return new Promise((resolve) => {
    if (isVisualizing && i < visitedNodeRefGroups.length) {
      setTimeout(async () => {
        for (const visitedNodeRef of visitedNodeRefGroups[i])
          if (
            !visitedNodeRef.current.state.isStart &&
            !visitedNodeRef.current.state.isTarget
          )
            if (visitedNodeRef.current.isVisited === 5) {
              visitedNodeRef.current.toggleSmallWeight();
              visitedNodeRef.current.isVisited = false;
            } else if (visitedNodeRef.current.isVisited === 10) {
              visitedNodeRef.current.toggleMediumWeight();
              visitedNodeRef.current.isVisited = false;
            } else if (visitedNodeRef.current.isVisited === 25) {
              visitedNodeRef.current.toggleLargeWeight();
              visitedNodeRef.current.isVisited = false;
            }

        i++;
        await iterateRandomWeightsMaze(i, visitedNodeRefGroups);
        resolve();
      }, mazeTimeDelay);
    } else resolve();
  });
}

function groupWeightsMazeNodes(visitedNodeRefs) {
  var visitedNodeRefGroups = [];
  for (let i = 0; i < 40; i++) visitedNodeRefGroups.push([]);
  for (const nodeRef of visitedNodeRefs) {
    var randGroup = randNumInRange(0, visitedNodeRefGroups.length - 1);
    visitedNodeRefGroups[randGroup].push(nodeRef);
  }

  return visitedNodeRefGroups;
}

export function randomWeightsMaze() {
  var visitedNodeRefs = [];
  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      let rand = Math.random();
      if (rand < 0.11) {
        nodeRef.current.isVisited = 5;
        visitedNodeRefs.push(nodeRef);
      } else if (rand < 0.22) {
        nodeRef.current.isVisited = 10;
        visitedNodeRefs.push(nodeRef);
      } else if (rand < 0.33) {
        nodeRef.current.isVisited = 25;
        visitedNodeRefs.push(nodeRef);
      }
    }
  }

  return visitedNodeRefs;
}

function randNumInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
