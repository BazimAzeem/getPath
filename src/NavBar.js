import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  ToggleButton,
  ButtonToolbar,
} from "react-bootstrap";
import {
  visualizeSearch,
  visualizePath,
  clearWallsAndWeights,
  clearSearchAndPath,
} from "./NodeGrid";
import Node from "./Node";
import { visualizeMaze, primsMaze } from "./other/primsMaze";
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
      wallAndWeightsToggleValue: "1",
    };
    this.isVisualizingSearch = false;
    this.isVisualizingMaze = false;

    this.wallAndWeightsToggleOptions = [
      { content: <Node isWall={true} isDisabled={true}></Node>, value: "1" },
      {
        content: <Node isSmallWeight={true} isDisabled={true}></Node>,
        value: "2",
      },
      {
        content: <Node isMediumWeight={true} isDisabled={true}></Node>,
        value: "3",
      },
      {
        content: <Node isLargeWeight={true} isDisabled={true}></Node>,
        value: "4",
      },
    ];

    this.legendEntrees = [
      {
        node: <Node isWall={true} isDisabled={true}></Node>,
        title: "Wall Node",
        description: "A node with a weight of infinity (impenetrable)",
      },
    ];
  }

  setVisualizing() {
    this.setState({ isVisualizing: true });
    isVisualizing = true;
  }

  resetVisualizing() {
    this.setState({ isVisualizing: false });
    isVisualizing = false;
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
                <NavDropdown.Item>An algorithm</NavDropdown.Item>
                <NavDropdown.Item>Another algorithm</NavDropdown.Item>
                <NavDropdown.Item>
                  An algorithm with a super looooong name
                </NavDropdown.Item>
                <NavDropdown.Item>Algo</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                as="button"
                disabled={isVisualizing && !this.isVisualizingSearch}
                onClick={async () => {
                  if (!this.state.isVisualizing) {
                    this.setVisualizing();
                    this.isVisualizingSearch = true;
                    clearSearchAndPath();
                    var targetNodeRef = await visualizeSearch(djikstra);
                    await visualizePath(targetNodeRef);
                    this.resetVisualizing();
                    this.isVisualizingSearch = false;
                  } else {
                    this.resetVisualizing();
                    this.isVisualizingSearch = false;
                    setTimeout(() => {
                      clearSearchAndPath();
                    }, 20);
                  }
                }}
              >
                {!this.isVisualizingSearch ? "Visualize" : "Cancel"}
              </Nav.Link>
              <Nav.Link
                as="button"
                disabled={isVisualizing}
                onClick={async () => {
                  this.setVisualizing();
                  this.isVisualizingMaze = true;
                  clearSearchAndPath();
                  clearWallsAndWeights();
                  await visualizeMaze(primsMaze);
                  this.resetVisualizing();
                  this.isVisualizingMaze = false;
                }}
              >
                Maze
              </Nav.Link>
              <NavDropdown title="Clear">
                <NavDropdown.Item
                  as="button"
                  disabled={isVisualizing}
                  onClick={() => {
                    clearSearchAndPath();
                  }}
                >
                  Search
                </NavDropdown.Item>
                <NavDropdown.Item
                  as="button"
                  disabled={isVisualizing}
                  onClick={() => {
                    clearWallsAndWeights();
                  }}
                >
                  Walls & Weights
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <ButtonToolbar className="toggle-button-group">
              {this.wallAndWeightsToggleOptions.map((radio, idx) => (
                <ToggleButton
                  className={
                    "toggle-button" +
                    (this.state.wallAndWeightsToggleValue === radio.value
                      ? " toggle-button-checked"
                      : "")
                  }
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  name="radio"
                  value={radio.value}
                  checked={this.state.wallAndWeightsToggleValue === radio.value}
                  onChange={(e) => {
                    this.setState({
                      wallAndWeightsToggleValue: e.currentTarget.value,
                    });
                    makeWall = radio.value == 1;
                    makeSmallWeight = radio.value == 2;
                    makeMediumWeight = radio.value == 3;
                    makeLargeWeight = radio.value == 4;
                  }}
                >
                  {radio.content}
                </ToggleButton>
              ))}
            </ButtonToolbar>
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
