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

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisualizing: false,
    };
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
                    this.setState({ isVisualizing: true });
                    var targetNodeRef = await visualizeSearch(djikstra);
                    await visualizePath(targetNodeRef);
                    this.setState({ isVisualizing: false });
                  } else {
                    this.setState({ isVisualizing: false });
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
