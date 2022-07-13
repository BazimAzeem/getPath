import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import {
  visualizeSearch,
  visualizePath,
  clearWallsAndWeights,
  clearSearchAndPath,
} from "./NodeGrid";
import { visualizeMaze, primsMaze } from "./other/primsMaze";
import Node from "./Node";
import { djikstra } from "./search algorithms/djikstra";
import "./NavBar.css";

// Global
export var isVisualizing = false;
export var makeWall = true;
export var makeSmallWeight = false;
export var makeMediumWeight = false;
export var makeLargeWeight = false;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisualizing: false,
      showCollapsed: false,
      showLegend: false,
    };
  }

  toggleVisualizing() {
    this.setState({ isVisualizing: !this.state.isVisualizing });
    isVisualizing = !isVisualizing;
  }

  render() {
    return (
      <Navbar expand="sm" expanded={this.state.showCollapsed}>
        <Navbar.Toggle
          onClick={() => {
            this.setState({ showCollapsed: !this.state.showCollapsed });
          }}
        >
          <span className="material-symbols-outlined">menu</span>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          placement="top"
          show={this.state.showCollapsed}
          onHide={() => {
            this.setState({ showCollapsed: false });
          }}
        >
          <Offcanvas.Header>
            <Nav.Link
              as="button"
              onClick={() => {
                this.setState({ showCollapsed: false });
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </Nav.Link>
            <Offcanvas.Title>Options</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <NavDropdown title="Algorithms">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something else here</NavDropdown.Item>
                <NavDropdown.Item>Separated link</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                as="button"
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
              </Nav.Link>
              <Nav.Link
                as="button"
                disabled={isVisualizing}
                onClick={async () => {
                  this.toggleVisualizing();
                  clearSearchAndPath();
                  clearWallsAndWeights();
                  await visualizeMaze(primsMaze);
                  this.setState({ isVisualizing: false });
                  isVisualizing = false;
                }}
              >
                Maze
              </Nav.Link>
              <Nav.Link
                as="button"
                disabled={isVisualizing}
                onClick={() => {
                  clearSearchAndPath();
                }}
              >
                Clear Search And Path
              </Nav.Link>
              <Nav.Link
                as="button"
                disabled={isVisualizing}
                onClick={() => {
                  clearWallsAndWeights();
                }}
              >
                Clear Walls And Weights
              </Nav.Link>
            </Nav>
            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={1}
              onChange={(value) => {
                makeWall = value == 1;
                makeSmallWeight = value == 2;
                makeMediumWeight = value == 3;
                makeLargeWeight = value == 4;
              }}
            >
              <ToggleButton id="tbg-1" value={1}>
                W
              </ToggleButton>
              <ToggleButton id="tbg-2" value={2}>
                5
              </ToggleButton>
              <ToggleButton id="tbg-3" value={3}>
                10
              </ToggleButton>
              <ToggleButton id="tbg-4" value={4}>
                25
              </ToggleButton>
            </ToggleButtonGroup>
          </Offcanvas.Body>
        </Navbar.Offcanvas>{" "}
        <Nav.Link
          as="button"
          onClick={() => {
            this.setState({ showLegend: true });
          }}
        >
          <span className="material-symbols-outlined">help</span>
        </Nav.Link>
        <Offcanvas
          placement="bottom"
          show={this.state.showLegend}
          onHide={() => {
            this.setState({ showLegend: false });
          }}
        >
          <Offcanvas.Header>
            <Nav.Link
              as="button"
              onClick={() => {
                this.setState({ showLegend: false });
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </Nav.Link>
            <Offcanvas.Title>Legend</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            I will be placing a description for each symbol here
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>
    );
  }
}

export default NavBar;
