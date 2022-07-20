import {
  getStartNodeRef,
  getTargetNodeRef,
  getNodeRefChildren,
  printNodeRef,
} from "./helper";

export function aStar(nodeRefGrid) {
  var targetNodeRef = getTargetNodeRef(nodeRefGrid);
  fillHeuristic(targetNodeRef, nodeRefGrid);

  var startNodeRef = getStartNodeRef(nodeRefGrid);
  startNodeRef.current.distance = 0;
  startNodeRef.current.cost = startNodeRef.current.heuristic;
  var pq = new PriorityQueue(nodeRefGrid);

  var visitedNodeRefs = [];
  while (pq.nodeRefs.length > 0) {
    var minNodeRef = pq.extractMinNodeRef();
    minNodeRef.current.isVisited = true;
    visitedNodeRefs.push(minNodeRef);

    if (
      minNodeRef.current.state.isTarget ||
      minNodeRef.current.distance === Infinity
    )
      return visitedNodeRefs;

    var minNodeRefChildren = getNodeRefChildren(minNodeRef, nodeRefGrid);
    for (const minNodeRefChild of minNodeRefChildren) {
      if (
        !minNodeRefChild.current.isVisited &&
        minNodeRefChild.current.distance >
          minNodeRef.current.distance + minNodeRefChild.current.weight
      ) {
        minNodeRefChild.current.distance =
          minNodeRef.current.distance + minNodeRefChild.current.weight;
        minNodeRefChild.current.cost =
          minNodeRefChild.current.distance + minNodeRefChild.current.heuristic;
        minNodeRefChild.current.predecessor = minNodeRef;
      }
    }
    pq.updatePriorityQueue();
  }

  return visitedNodeRefs;
}

export default aStar;

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

function fillHeuristic(targetNodeRef, nodeRefGrid) {
  var targetRow = targetNodeRef.current.props.row;
  var targetCol = targetNodeRef.current.props.col;

  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      var curRow = nodeRef.current.props.row;
      var curCol = nodeRef.current.props.col;

      nodeRef.current.heuristic =
        Math.sqrt((curRow - targetRow) ** 2 + (curCol - targetCol) ** 2) * 2.5;
    }
  }
}
