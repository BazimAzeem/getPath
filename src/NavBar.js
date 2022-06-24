import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  visualizeSearch,
  visualizePath,
  clearWalls,
  clearSearchAndPath,
} from "./NodeGrid";
import { djikstra } from "./search algorithms/djikstra";

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
        <Navbar fixed="top" variant="dark" bg="dark">
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
                    }, 10);
                  }
                }}
              >
                {!this.state.isVisualizing ? "Visualize" : "Cancel"}
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button
                onClick={() => {
                  clearWalls();
                  clearSearchAndPath();
                }}
              >
                Clear
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
