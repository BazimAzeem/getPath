import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Legend from "./Legend";
import {
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  ToggleButton,
  ButtonToolbar,
  Modal,
} from "react-bootstrap";
import {
  visualizeSearch,
  visualizePath,
  clearWallsAndWeights,
  clearSearchAndPath,
  resetStartAndTargetNodes,
} from "../node grid/NodeGrid";
import Node from "../node grid/Node";
import { visualizeMaze, primsMaze } from "../other/primsMaze";
import { dijkstra } from "../search algorithms/dijkstra";
import { aStar } from "../search algorithms/aStar";
import "./NavBar.css";

// Global
export var isVisualizing = false;
export var makeWall = true;
export var makeSmallWeight = false;
export var makeMediumWeight = false;
export var makeLargeWeight = false;

class UI extends React.Component {
  constructor(props) {
    super(props);
    this.algorithms = [
      {
        name: "Dijkstra's",
        function: dijkstra,
      },
      {
        name: "A*",
        function: aStar,
      },
    ];

    this.state = {
      isVisualizing: false,
      showCollapsed: false,
      showNoPathError: false,
      wallAndWeightsToggleValue: "1",
      chosenAlgorithm: this.algorithms[0],
    };

    this.isVisualizingSearch = false;
    this.isVisualizingMaze = false;

    this.wallAndWeightsToggleOptions = [
      {
        content: <Node isWall={true} isDisabled={true}></Node>,
        value: "1",
      },
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
      <>
        <Navbar expand="md" expanded={this.state.showCollapsed}>
          <Navbar.Toggle
            onClick={() =>
              this.setState({ showCollapsed: !this.state.showCollapsed })
            }
          >
            <span className="material-symbols-outlined">menu</span>
          </Navbar.Toggle>
          <Navbar.Offcanvas
            placement="top"
            show={this.state.showCollapsed ? 1 : 0}
            onHide={() => this.setState({ showCollapsed: false })}
          >
            <Offcanvas.Header>
              <Nav.Link
                as="button"
                onClick={() => this.setState({ showCollapsed: false })}
              >
                <span className="material-symbols-outlined">close</span>
              </Nav.Link>
              <Offcanvas.Title>Options</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <NavDropdown
                  title={"Algorithm: " + this.state.chosenAlgorithm.name}
                >
                  {this.algorithms.map((algorithm, index) => (
                    <NavDropdown.Item
                      as="button"
                      key={index}
                      onClick={() =>
                        this.setState({ chosenAlgorithm: algorithm })
                      }
                    >
                      {algorithm.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <Nav.Link
                  as="button"
                  id="visualize-button"
                  disabled={isVisualizing && !this.isVisualizingSearch}
                  onClick={async () => {
                    this.setState({ showCollapsed: false });
                    if (!this.state.isVisualizing) {
                      this.setVisualizing();
                      this.isVisualizingSearch = true;
                      clearSearchAndPath();
                      var targetNodeRef = await visualizeSearch(
                        this.state.chosenAlgorithm.function
                      );
                      if (targetNodeRef.current.predecessor) {
                        console.log(targetNodeRef);
                        await visualizePath(targetNodeRef);
                      } else {
                        this.setState({ showNoPathError: true });
                      }
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
                    this.setState({ showCollapsed: false });
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
                      clearWallsAndWeights();
                      resetStartAndTargetNodes();
                    }}
                  >
                    All
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as="button"
                    disabled={isVisualizing}
                    onClick={() => {
                      clearSearchAndPath();
                    }}
                  >
                    Search & Path
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
                {this.wallAndWeightsToggleOptions.map(
                  (wallAndWeightsToggle, index) => (
                    <ToggleButton
                      className={
                        "toggle-button" +
                        (this.state.wallAndWeightsToggleValue ===
                        wallAndWeightsToggle.value
                          ? " toggle-button-checked"
                          : "")
                      }
                      key={index}
                      id={`radio-${index}`}
                      type="radio"
                      name="radio"
                      value={wallAndWeightsToggle.value}
                      checked={
                        this.state.wallAndWeightsToggleValue ===
                        wallAndWeightsToggle.value
                      }
                      onChange={(e) => {
                        this.setState({
                          wallAndWeightsToggleValue: e.currentTarget.value,
                        });
                        makeWall = wallAndWeightsToggle.value === "1";
                        makeSmallWeight = wallAndWeightsToggle.value === "2";
                        makeMediumWeight = wallAndWeightsToggle.value === "3";
                        makeLargeWeight = wallAndWeightsToggle.value === "4";
                      }}
                    >
                      {wallAndWeightsToggle.content}
                    </ToggleButton>
                  )
                )}
              </ButtonToolbar>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Legend />
        </Navbar>
        <Modal
          show={this.state.showNoPathError}
          onHide={() => this.setState({ showNoPathError: false })}
          centered
          fullscreen="sm-down"
        >
          <Modal.Header closeButton>
            <Modal.Title>No path has been found</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
        </Modal>
      </>
    );
  }
}

export default UI;
