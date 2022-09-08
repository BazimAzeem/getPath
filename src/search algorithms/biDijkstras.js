import {
  getStartNodeRef,
  getTargetNodeRef,
  getNodeRefChildren,
  printNodeRef,
} from "./helper";

export function biDijktras(nodeRefGrid) {
  var startNodeRef = getStartNodeRef(nodeRefGrid);
  startNodeRef.current.distance = 0;
  var forPQ = new ForPriorityQueue(nodeRefGrid);

  var targetNodeRef = getTargetNodeRef(nodeRefGrid);
  targetNodeRef.current.distanceBack = 0;
  var backPQ = new BackPriorityQueue(nodeRefGrid);

  var visitedNodeRefs = [];
  while (forPQ.nodeRefs.length > 0 && backPQ.nodeRefs.length > 0) {
    // Forward
    var forMinNodeRef = forPQ.extractMinNodeRef();
    forMinNodeRef.current.isVisited = 1;

    if (forMinNodeRef.current.distance === Infinity)
      return [visitedNodeRefs, null];
    visitedNodeRefs.push(forMinNodeRef);

    var forMinNodeRefChildren = getNodeRefChildren(forMinNodeRef, nodeRefGrid);
    for (const forMinNodeRefChild of forMinNodeRefChildren) {
      if (
        forMinNodeRefChild.current.isVisited === -1 ||
        forMinNodeRefChild.current.distanceBack !== Infinity
      ) {
        if (forMinNodeRefChild.current.distanceBack !== Infinity)
          visitedNodeRefs.push(forMinNodeRefChild);
        return [
          visitedNodeRefs,
          getPathNodeRefs(forMinNodeRef, forMinNodeRefChild),
        ];
      } else if (
        !forMinNodeRefChild.current.isVisited &&
        forMinNodeRefChild.current.distance >
          forMinNodeRef.current.distance + forMinNodeRefChild.current.weight
      ) {
        forMinNodeRefChild.current.distance =
          forMinNodeRef.current.distance + forMinNodeRefChild.current.weight;
        forMinNodeRefChild.current.predecessor = forMinNodeRef;
      }
    }
    forPQ.updatePriorityQueue();

    // Backward
    var backMinNodeRef = backPQ.extractMinNodeRef();
    backMinNodeRef.current.isVisited = -1;

    if (backMinNodeRef.current.distanceBack === Infinity)
      return [visitedNodeRefs, null];
    visitedNodeRefs.push(backMinNodeRef);

    var backMinNodeRefChildren = getNodeRefChildren(
      backMinNodeRef,
      nodeRefGrid
    );
    for (const backMinNodeRefChild of backMinNodeRefChildren) {
      if (
        backMinNodeRefChild.current.isVisited === 1 ||
        backMinNodeRefChild.current.distance !== Infinity
      ) {
        if (backMinNodeRefChild.current.distance !== Infinity)
          visitedNodeRefs.push(backMinNodeRefChild);
        return [
          visitedNodeRefs,
          getPathNodeRefs(backMinNodeRefChild, backMinNodeRef),
        ];
      } else if (
        !backMinNodeRefChild.current.isVisited &&
        backMinNodeRefChild.current.distanceBack >
          backMinNodeRef.current.distanceBack +
            backMinNodeRefChild.current.weight
      ) {
        backMinNodeRefChild.current.distanceBack =
          backMinNodeRef.current.distanceBack +
          backMinNodeRefChild.current.weight;
        backMinNodeRefChild.current.predecessor = backMinNodeRef;
      }
    }
    backPQ.updatePriorityQueue();
  }

  return [visitedNodeRefs, null];
}

export default biDijktras;

function getPathNodeRefs(forConnectNodeRef, backConnectNodeRef) {
  var pathNodeRefs = [];

  // Forward Nodes
  var currentNodeRef = forConnectNodeRef;
  while (!currentNodeRef.current.state.isStart) {
    pathNodeRefs.push(currentNodeRef);
    currentNodeRef = currentNodeRef.current.predecessor;
  }
  pathNodeRefs.push(currentNodeRef);
  pathNodeRefs.reverse();

  // Backward Nodes
  currentNodeRef = backConnectNodeRef;
  while (!currentNodeRef.current.state.isTarget) {
    pathNodeRefs.push(currentNodeRef);
    currentNodeRef = currentNodeRef.current.predecessor;
  }
  pathNodeRefs.push(currentNodeRef);

  return pathNodeRefs;
}

class ForPriorityQueue {
  constructor(nodeRefGrid) {
    this.nodeRefs = nodeRefGrid.flat();
    this.updatePriorityQueue();
  }

  extractMinNodeRef() {
    return this.nodeRefs.pop();
  }

  updatePriorityQueue() {
    this.nodeRefs.sort((a, b) =>
      a.current.distance < b.current.distance ? 1 : -1
    );
  }

  printPriorityQueue() {
    for (const nodeRef of this.nodeRefs) {
      printNodeRef(nodeRef);
    }
  }
}

class BackPriorityQueue {
  constructor(nodeRefGrid) {
    this.nodeRefs = nodeRefGrid.flat();
    this.updatePriorityQueue();
  }

  extractMinNodeRef() {
    return this.nodeRefs.pop();
  }

  updatePriorityQueue() {
    this.nodeRefs.sort((a, b) =>
      a.current.distanceBack < b.current.distanceBack ? 1 : -1
    );
  }

  printPriorityQueue() {
    for (const nodeRef of this.nodeRefs) {
      printNodeRef(nodeRef);
    }
  }
}
