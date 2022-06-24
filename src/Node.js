import React from "react";
import "./Node.css";

// Global
var isMakingWall = false;
var isMakingSmallWeight = false;
var isMakingMediumWeight = false;
var isMakingLargeWeight = false;
var isMovingStart = false;
var isMovingTarget = false;
window.addEventListener("mouseup", () => {
  isMakingWall = false;
});

var keysPressed = {};
window.addEventListener("keydown", (event) => {
  if (event.repeat) return;
  keysPressed[event.key] = true;
  console.log(keysPressed);
});

window.addEventListener("keyup", (event) => {
  delete keysPressed[event.key];
  console.log(keysPressed);
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
      isSmallWeight: false,
      isMediumWeight: false,
      isLargeWeight: false,
    };
    this.defaultState = this.state;

    this.isVisited = false;
    this.weight = 2.5;
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
    this.weight = 2.5;
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

  toggleSmallWeight() {
    this.setState({ isSmallWeight: !this.state.isSmallWeight });
    this.weight = this.weight === 5 ? 1 : 5;
  }

  toggleMediumWeight() {
    this.setState({ isMediumWeight: !this.state.isMediumWeight });
    this.weight = this.weight === 10 ? 1 : 10;
  }

  toggleLargeWeight() {
    this.setState({ isLargeWeight: !this.state.isLargeWeight });
    this.weight = this.weight === 25 ? 1 : 25;
  }

  handleMouseDown() {
    if (this.state.isStart) {
      isMovingStart = true;
    } else if (this.state.isTarget) {
      isMovingTarget = true;
    } else if (
      Object.keys(keysPressed).length &&
      "w" in keysPressed &&
      "1" in keysPressed
    ) {
      this.toggleSmallWeight();
      isMakingSmallWeight = true;
    } else if (
      Object.keys(keysPressed).length &&
      "w" in keysPressed &&
      "2" in keysPressed
    ) {
      this.toggleMediumWeight();
      isMakingMediumWeight = true;
    } else if (
      Object.keys(keysPressed).length &&
      "w" in keysPressed &&
      "3" in keysPressed
    ) {
      this.toggleLargeWeight();
      isMakingLargeWeight = true;
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
    } else if (
      isMakingSmallWeight &&
      !(this.state.isStart || this.state.isTarget)
    ) {
      this.toggleSmallWeight();
    } else if (
      isMakingMediumWeight &&
      !(this.state.isStart || this.state.isTarget)
    ) {
      this.toggleMediumWeight();
    } else if (
      isMakingLargeWeight &&
      !(this.state.isStart || this.state.isTarget)
    ) {
      this.toggleLargeWeight();
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
    isMakingSmallWeight = false;
    isMakingMediumWeight = false;
    isMakingLargeWeight = false;
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
          (this.state.isSmallWeight ||
          this.state.isMediumWeight ||
          this.state.isLargeWeight
            ? " node-is-weight"
            : "") +
          (this.state.isPath ? " node-is-path" : "")
        }
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onClick={() => {
          console.log(this.props, this.state);
        }}
      >
        {this.state.isSmallWeight ? (
          <p>5</p>
        ) : this.state.isMediumWeight ? (
          <p>10</p>
        ) : this.state.isLargeWeight ? (
          <p>25</p>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Node;
