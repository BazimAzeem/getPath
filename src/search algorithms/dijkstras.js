import { getStartNodeRef, getNodeRefChildren, printNodeRef } from "./helper";

export function dijkstras(nodeRefGrid) {
  var startNodeRef = getStartNodeRef(nodeRefGrid);
  startNodeRef.current.distance = 0;
  var pq = new PriorityQueue(nodeRefGrid);

  var visitedNodeRefs = [];
  while (pq.nodeRefs.length > 0) {
    var minNodeRef = pq.extractMinNodeRef();
    minNodeRef.current.isVisited = true;

    if (minNodeRef.current.distance === Infinity)
      return [visitedNodeRefs, null];
    visitedNodeRefs.push(minNodeRef);

    if (minNodeRef.current.state.isTarget)
      return [visitedNodeRefs, getPathNodeRefs(minNodeRef)];

    var minNodeRefChildren = getNodeRefChildren(minNodeRef, nodeRefGrid);
    for (const minNodeRefChild of minNodeRefChildren) {
      if (
        !minNodeRefChild.current.isVisited &&
        minNodeRefChild.current.distance >
          minNodeRef.current.distance + minNodeRefChild.current.weight
      ) {
        minNodeRefChild.current.distance =
          minNodeRef.current.distance + minNodeRefChild.current.weight;
        minNodeRefChild.current.predecessor = minNodeRef;
      }
    }
    pq.updatePriorityQueue();
  }

  return [visitedNodeRefs, null];
}

export default dijkstras;

function getPathNodeRefs(targetNodeRef) {
  var pathNodeRefs = [];
  var currentNodeRef = targetNodeRef;
  while (!currentNodeRef.current.state.isStart) {
    pathNodeRefs.push(currentNodeRef);
    currentNodeRef = currentNodeRef.current.predecessor;
  }
  pathNodeRefs.push(currentNodeRef);
  pathNodeRefs.reverse();

  return pathNodeRefs;
}

class PriorityQueue {
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
