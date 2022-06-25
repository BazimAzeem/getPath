import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  visualizeSearch,
  visualizePath,
  clearWallsAndWeights,
  clearSearchAndPath,
} from "./NodeGrid";
import { djikstra } from "./search algorithms/djikstra";
import "./NavBar.css";

// Global isVisualizing
export var isVisualizing = false;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisualizing: false,
    };
  }

  toggleVisualizing() {
    this.setState({ isVisualizing: !this.state.isVisualizing });
    isVisualizing = !isVisualizing;
  }

  render() {
    return (
      <div>
        <Navbar className="nav-bar">
          <Nav>
            <Nav.Item>
              <Button
                onClick={async () => {
                  if (!this.state.isVisualizing) {
                    this.toggleVisualizing();
                    clearSearchAndPath();
                    var targetNodeRef = await visualizeSearch(djikstra);
                    await visualizePath(targetNodeRef);
                    this.setState({ isVisualizing: false });
                    isVisualizing = false;
                  } else {
                    this.toggleVisualizing();
                    setTimeout(() => {
                      clearSearchAndPath();
                    }, 20);
                  }
                }}
              >
                {!this.state.isVisualizing ? "Visualize" : "Cancel"}
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button
                onClick={() => {
                  clearWallsAndWeights();
                }}
              >
                Clear Walls And Weights
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button
                onClick={() => {
                  clearSearchAndPath();
                }}
              >
                Clear Search And Path
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
