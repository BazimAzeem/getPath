import { Heap } from "./helper";

export function djikstra(nodeGrid) {
  var heap = new Heap(nodeGrid);

  heap.printHeap();

  return [];
}

export default djikstra;
