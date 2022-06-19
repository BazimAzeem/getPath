import {
  PriorityQueue,
  getstartNodeRef,
  printNodeRef,
  getNodeRefChildren,
} from "./helper";

export function djikstra(nodeRefGrid) {
  var startNodeRef = getstartNodeRef(nodeRefGrid);
  startNodeRef.current.distance = 0;
  var pq = new PriorityQueue(nodeRefGrid);

  var visitedNodeRefs = [];
  while (pq.nodeRefs.length > 0) {
    var minNodeRef = pq.extractMinNodeRef();
    minNodeRef.current.visited = true;
    visitedNodeRefs.push(minNodeRef);

    if (
      minNodeRef.current.state.isTarget ||
      minNodeRef.current.distance == Infinity
    )
      return visitedNodeRefs;

    var minNodeRefChildren = getNodeRefChildren(minNodeRef, nodeRefGrid);
    for (const minNodeRefChild of minNodeRefChildren) {
      if (
        !minNodeRefChild.current.visited &&
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

  return visitedNodeRefs;
}

export default djikstra;
