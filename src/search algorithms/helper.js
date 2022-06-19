export class PriorityQueue {
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

// Helper Functions
export function getstartNodeRef(nodeRefGrid) {
  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      if (nodeRef.current.state.isStart) return nodeRef;
    }
  }
}

export function printNodeRef(nodeRef) {
  console.log(
    nodeRef.current.props,
    nodeRef.current.distance,
    nodeRef.current.predecessor
  );
}

export function getNodeRefChildren(nodeRef, nodeRefGrid) {
  var row = nodeRef.current.props.row;
  var col = nodeRef.current.props.col;
  var rows = nodeRefGrid.length;
  var cols = nodeRefGrid[0].length;

  var nodeRefChildren = [];

  if (col - 1 >= 0) nodeRefChildren.push(nodeRefGrid[row][col - 1]);
  if (col + 1 < cols) nodeRefChildren.push(nodeRefGrid[row][col + 1]);

  // Even rows
  if (row % 2 == 0) {
    if (row - 1 >= 0) {
      nodeRefChildren.push(nodeRefGrid[row - 1][col]);
      if (col - 1 >= 0) nodeRefChildren.push(nodeRefGrid[row - 1][col - 1]);
    }
    if (row + 1 < rows) {
      nodeRefChildren.push(nodeRefGrid[row + 1][col]);
      if (col - 1 >= 0) nodeRefChildren.push(nodeRefGrid[row + 1][col - 1]);
    }
  }
  // Odd rows
  else {
    if (row - 1 >= 0) {
      nodeRefChildren.push(nodeRefGrid[row - 1][col]);
      if (col + 1 < cols) nodeRefChildren.push(nodeRefGrid[row - 1][col + 1]);
    }
    if (row + 1 < rows) {
      nodeRefChildren.push(nodeRefGrid[row + 1][col]);
      if (col + 1 < cols) nodeRefChildren.push(nodeRefGrid[row + 1][col + 1]);
    }
  }

  return nodeRefChildren;
}
