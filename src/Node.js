import React from "react";
import "./Node.css";

// Global
var isMakingWall = false;
var isMovingStart = false;
var isMovingTarget = false;
window.addEventListener("mouseup", () => {
  isMakingWall = false;
  isMovingStart = false;
  isMovingTarget = false;
});

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisited: false,
      isWall: false,
      isPath: false,
      isStart: this.props.isStart,
      isTarget: this.props.isTarget,
    };
    this.defaultState = this.state;

    this.isVisited = false;
    this.weight = 1;
    this.distance = Infinity;
    this.predecessor = null;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  resetToDefault() {
    this.isVisited = false;
    this.weight = 1;
    this.distance = Infinity;
    this.predecessor = null;
    this.setState(this.defaultState);
  }

  makeWall() {
    this.setState({ isWall: !this.state.isWall });
    this.weight = this.weight == Infinity ? 1 : Infinity;
  }

  handleMouseDown() {
    if (this.state.isStart) {
      isMovingStart = true;
    } else if (this.state.isTarget) {
      isMovingTarget = true;
    } else {
      this.makeWall();
      isMakingWall = true;
    }
  }

  handleMouseEnter() {
    if (isMovingStart) {
      this.setState({ isStart: true, isWall: false });
    } else if (isMovingTarget) {
      this.setState({ isTarget: true, isWall: false });
    } else if (isMakingWall && !(this.state.isStart || this.state.isTarget)) {
      this.makeWall();
    }
  }

  handleMouseLeave() {
    if (isMovingStart) {
      this.setState({ isStart: false });
    } else if (isMovingTarget) {
      this.setState({ isTarget: false });
    }
  }

  handleMouseUp() {
    isMakingWall = false;
    isMovingStart = false;
    isMovingTarget = false;
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
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onClick={() => {
          console.log(this.isVisited);
        }}
      ></div>
    );
  }
}

export default Node;
