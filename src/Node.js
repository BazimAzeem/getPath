import React from "react";
import "./Node.css";

// Global
var mousePressed = false;
window.addEventListener("mouseup", () => {
  mousePressed = false;
});

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisited: this.props.isVisited,
      isWall: false,
      isPath: false,
      isStart: this.props.isStart,
      isTarget: this.props.isTarget,
    };
    this.isVisited = false;
    this.weight = 1;
    this.distance = Infinity;
    this.predecessor = null;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  makeWall() {
    this.setState({ isWall: !this.state.isWall });
    this.weight = Infinity;
  }

  handleMouseDown() {
    if (!(this.state.isStart || this.state.isTarget)) {
      this.makeWall();
      mousePressed = true;
    }
  }

  handleMouseEnter() {
    if (mousePressed && !(this.state.isStart || this.state.isTarget)) {
      this.makeWall();
    }
  }

  handleMouseUp() {
    mousePressed = false;
  }

  render() {
    return (
      <div
        className={
          "node" +
          (this.state.isStart ? " node-is-start" : "") +
          (this.state.isTarget ? " node-is-target" : "") +
          (this.state.isWall ? " node-is-wall" : "") +
          (this.state.isVisited ? " node-is-visited" : "") +
          (this.state.isPath ? " node-is-path" : "")
        }
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseUp={this.handleMouseUp}
        onClick={() => {
          console.log(this.props, this.state);
        }}
      ></div>
    );
  }
}

export default Node;
