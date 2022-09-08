import {
  getStartNodeRef,
  getTargetNodeRef,
  getNodeRefChildren,
  printNodeRef,
} from "./helper";

export function greedyBFS(nodeRefGrid) {
  var targetNodeRef = getTargetNodeRef(nodeRefGrid);
  fillHeuristic(targetNodeRef, nodeRefGrid);

  var startNodeRef = getStartNodeRef(nodeRefGrid);
  startNodeRef.current.cost = startNodeRef.current.heuristic;
  var pq = new PriorityQueue(nodeRefGrid);

  var visitedNodeRefs = [];
  while (pq.nodeRefs.length > 0) {
    var minNodeRef = pq.extractMinNodeRef();
    minNodeRef.current.isVisited = true;

    if (minNodeRef.current.cost === Infinity) return [visitedNodeRefs, null];
    visitedNodeRefs.push(minNodeRef);

    if (minNodeRef.current.state.isTarget)
      return [visitedNodeRefs, getPathNodeRefs(minNodeRef)];

    var minNodeRefChildren = getNodeRefChildren(minNodeRef, nodeRefGrid);
    for (const minNodeRefChild of minNodeRefChildren) {
      if (!minNodeRefChild.current.isVisited) {
        minNodeRefChild.current.cost = minNodeRefChild.current.heuristic;
        minNodeRefChild.current.predecessor = minNodeRef;
      }
    }
    pq.updatePriorityQueue();
  }

  return [visitedNodeRefs, null];
}

export default greedyBFS;

function getPathNodeRefs(targetNodeRef) {
  if (!targetNodeRef.current.predecessor) return null;

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

function fillHeuristic(targetNodeRef, nodeRefGrid) {
  var targetRow = targetNodeRef.current.props.row;
  var targetCol = targetNodeRef.current.props.col;

  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      var curRow = nodeRef.current.props.row;
      var curCol = nodeRef.current.props.col;

      nodeRef.current.heuristic =
        Math.sqrt((curRow - targetRow) ** 2 + (curCol - targetCol) ** 2) * 2.5 +
        nodeRef.current.weight;
    }
  }
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
    this.nodeRefs.sort((a, b) => (a.current.cost < b.current.cost ? 1 : -1));
  }

  printPriorityQueue() {
    for (const nodeRef of this.nodeRefs) {
      printNodeRef(nodeRef);
    }
  }
}
