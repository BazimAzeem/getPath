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
      isStart: this.props.isStart,
      isTarget: this.props.isTarget,
      weight: 1,
      distance: Infinity,
      predecessor: null,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown() {
    if (!(this.state.isStart || this.state.isTarget)) {
      this.setState({ isWall: !this.state.isWall });
      mousePressed = true;
    }
  }

  handleMouseEnter() {
    if (mousePressed && !(this.state.isStart || this.state.isTarget)) {
      this.setState({ isWall: !this.state.isWall });
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
          (this.state.isVisited ? " node-is-visited" : "")
        }
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseUp={this.handleMouseUp}
      ></div>
    );
  }
}

export default Node;
