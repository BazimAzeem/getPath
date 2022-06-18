export class Heap {
  constructor(nodeGrid) {
    this.nodes = nodeGrid.flat();
  }

  printHeap() {
    for (let i = 0; i < this.nodes.length; i++) {
      console.log(this.nodes[i].props, this.nodes[i].state);
    }
  }
}
