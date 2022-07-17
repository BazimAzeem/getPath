export function getStartNodeRef(nodeRefGrid) {
  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      if (nodeRef.current.state.isStart) return nodeRef;
    }
  }
  return null;
}

export function getTargetNodeRef(nodeRefGrid) {
  for (const nodeRefArray of nodeRefGrid) {
    for (const nodeRef of nodeRefArray) {
      if (nodeRef.current.state.isTarget) return nodeRef;
    }
  }
  return null;
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
  if (row % 2 === 0) {
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
