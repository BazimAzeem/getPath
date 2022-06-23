import React from "react";
import "./Node.css";

// Global
var isMakingWall = false;
var isMovingStart = false;
var isMovingTarget = false;
window.addEventListener("mouseup", () => {
  isMakingWall = false;
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

    this.wasWall = false;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  resetEverything() {
    this.isVisited = false;
    this.weight = 1;
    this.distance = Infinity;
    this.predecessor = null;
    this.setState(this.defaultState);
  }

  resetVisitedAndPath() {
    this.isVisited = false;
    this.distance = Infinity;
    this.predecessor = null;
    this.setState({ isPath: false, isVisited: false });
  }

  toggleWall() {
    this.setState({ isWall: !this.state.isWall });
    this.weight = this.weight === Infinity ? 1 : Infinity;
  }

  handleMouseDown() {
    if (this.state.isStart) {
      isMovingStart = true;
    } else if (this.state.isTarget) {
      isMovingTarget = true;
    } else {
      this.toggleWall();
      isMakingWall = true;
    }
  }

  handleMouseEnter() {
    if (isMovingStart) {
      this.setState({ isStart: true });
      if (this.state.isWall) {
        this.toggleWall();
        this.wasWall = true;
      }
    } else if (isMovingTarget) {
      this.setState({ isTarget: true });
      if (this.state.isWall) {
        this.toggleWall();
        this.wasWall = true;
      }
    } else if (isMakingWall && !(this.state.isStart || this.state.isTarget)) {
      this.toggleWall();
    }
  }

  handleMouseLeave() {
    if (isMovingStart) {
      this.setState({ isStart: false });
      if (this.wasWall) this.toggleWall();
    } else if (isMovingTarget) {
      this.setState({ isTarget: false });
      if (this.wasWall) this.toggleWall();
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
          console.log(this.props, this.state);
        }}
      ></div>
    );
  }
}

export default Node;
