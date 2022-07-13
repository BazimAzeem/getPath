import React from "react";
import "./Node.css";
import {
  isVisualizing,
  makeWall,
  makeSmallWeight,
  makeMediumWeight,
  makeLargeWeight,
} from "./NavBar";

// Global
var isMakingWall = false;
var isMakingSmallWeight = false;
var isMakingMediumWeight = false;
var isMakingLargeWeight = false;
var isMovingStart = false;
var isMovingTarget = false;
window.addEventListener("mouseup", () => {
  isMakingWall = false;
  isMakingSmallWeight = false;
  isMakingMediumWeight = false;
  isMakingLargeWeight = false;
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
    this.isVisiting = false;
    this.weight = 2.5;
    this.distance = Infinity;
    this.predecessor = null;

    this.wasWall = false;
    this.wasSmallWeight = false;
    this.wasMediumWeight = false;
    this.wasLargeWeight = false;

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
    this.isVisiting = false;
    this.isVisited = false;
    this.distance = Infinity;
    this.predecessor = null;
    this.setState({ isPath: false, isVisited: false });
  }

  toggleWall() {
    if (this.state.isSmallWeight) this.toggleSmallWeight();
    else if (this.state.isMediumWeight) this.toggleMediumWeight();
    else if (this.state.isLargeWeight) this.toggleLargeWeight();
    this.setState({ isWall: !this.state.isWall });
    this.weight = this.weight === Infinity ? 2.5 : Infinity;
  }

  toggleSmallWeight() {
    if (this.state.isWall) this.toggleWall();
    else if (this.state.isMediumWeight) this.toggleMediumWeight();
    else if (this.state.isLargeWeight) this.toggleLargeWeight();
    this.setState({ isSmallWeight: !this.state.isSmallWeight });
    this.weight = this.weight === 5 ? 2.5 : 5;
  }

  toggleMediumWeight() {
    if (this.state.isWall) this.toggleWall();
    else if (this.state.isSmallWeight) this.toggleSmallWeight();
    else if (this.state.isLargeWeight) this.toggleLargeWeight();
    this.setState({ isMediumWeight: !this.state.isMediumWeight });
    this.weight = this.weight === 10 ? 2.5 : 10;
  }

  toggleLargeWeight() {
    if (this.state.isWall) this.toggleWall();
    else if (this.state.isSmallWeight) this.toggleSmallWeight();
    else if (this.state.isMediumWeight) this.toggleMediumWeight();
    this.setState({ isLargeWeight: !this.state.isLargeWeight });
    this.weight = this.weight === 25 ? 2.5 : 25;
  }

  handleMouseDown() {
    if (!isVisualizing) {
      if (this.state.isStart) {
        isMovingStart = true;
      } else if (this.state.isTarget) {
        isMovingTarget = true;
      } else if (makeSmallWeight) {
        this.toggleSmallWeight();
        isMakingSmallWeight = true;
      } else if (makeMediumWeight) {
        this.toggleMediumWeight();
        isMakingMediumWeight = true;
      } else if (makeLargeWeight) {
        this.toggleLargeWeight();
        isMakingLargeWeight = true;
      } else if (makeWall) {
        this.toggleWall();
        isMakingWall = true;
      }
    }
  }

  handleMouseEnter() {
    if (isMovingStart) {
      this.setState({ isStart: true });
      if (this.state.isWall) {
        this.toggleWall();
        this.wasWall = true;
      } else if (this.state.isSmallWeight) {
        this.toggleSmallWeight();
        this.wasSmallWeight = true;
      } else if (this.state.isMediumWeight) {
        this.toggleMediumWeight();
        this.wasMediumWeight = true;
      } else if (this.state.isLargeWeight) {
        this.toggleLargeWeight();
        this.wasLargeWeight = true;
      }
    } else if (isMovingTarget) {
      this.setState({ isTarget: true });
      if (this.state.isWall) {
        this.toggleWall();
        this.wasWall = true;
      } else if (this.state.isSmallWeight) {
        this.toggleSmallWeight();
        this.wasSmallWeight = true;
      } else if (this.state.isMediumWeight) {
        this.toggleMediumWeight();
        this.wasMediumWeight = true;
      } else if (this.state.isLargeWeight) {
        this.toggleLargeWeight();
        this.wasLargeWeight = true;
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
      else if (this.wasSmallWeight) this.toggleSmallWeight();
      else if (this.wasMediumWeight) this.toggleMediumWeight();
      else if (this.wasLargeWeight) this.toggleLargeWeight();
    } else if (isMovingTarget) {
      this.setState({ isTarget: false });
      if (this.wasWall) this.toggleWall();
      else if (this.wasSmallWeight) this.toggleSmallWeight();
      else if (this.wasMediumWeight) this.toggleMediumWeight();
      else if (this.wasLargeWeight) this.toggleLargeWeight();
    }
  }

  handleMouseUp() {
    isMakingWall = false;
    if (!this.state.isTarget) isMovingStart = false;
    if (!this.state.isStart) isMovingTarget = false;
    isMakingSmallWeight = false;
    isMakingMediumWeight = false;
    isMakingLargeWeight = false;
  }

  render() {
    return (
      <div
        ref={this.ref}
        className={
          "node" +
          (this.state.isStart ? " node-is-start" : "") +
          (this.state.isTarget ? " node-is-target" : "") +
          (this.state.isWall ? " node-is-wall" : "") +
          (this.state.isSmallWeight
            ? " node-is-weight node-is-small-weight"
            : "") +
          (this.state.isMediumWeight
            ? " node-is-weight node-is-medium-weight"
            : "") +
          (this.state.isLargeWeight
            ? " node-is-weight node-is-large-weight"
            : "") +
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
      >
        {this.state.isStart ? (
          <span className="material-symbols-outlined start">
            keyboard_double_arrow_right
          </span>
        ) : this.state.isTarget ? (
          <span className="material-symbols-outlined target">
            nest_thermostat_gen_3
          </span>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Node;
