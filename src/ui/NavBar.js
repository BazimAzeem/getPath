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
  nodeRefGrid,
} from "../node grid/NodeGrid";
import Node from "../node grid/Node";
import { visualizeMaze, primsMaze } from "../other/primsMaze";
import dijkstra from "../search algorithms/dijkstra";
import aStar from "../search algorithms/aStar";
import greedyBFS from "../search algorithms/greedyBFS";
import { biDijktras } from "../search algorithms/biDijkstras";
import "./NavBar.css";

// Global
export var isVisualizing = false;
export var hasVisualizedSearch = false;
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
      {
        name: "Greedy BFS",
        function: greedyBFS,
      },
      {
        name: "Bidirectional Dijkstra's",
        function: biDijktras,
      },
    ];

    this.state = {
      isVisualizing: false,
      showCollapsed: false,
      showNoPathError: false,
      wallAndWeightsToggleValue: "1",
      chosenAlgorithm: this.algorithms[0],
      isDesktop: false,
    };

    this.toggleIsDesktop = this.toggleIsDesktop.bind(this);

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

  componentDidMount() {
    this.toggleIsDesktop();
    window.addEventListener("resize", this.toggleIsDesktop);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.toggleIsDesktop);
  }

  toggleIsDesktop() {
    this.setState({ isDesktop: window.innerWidth >= 768 });
  }

  render() {
    return (
      <>
        <Navbar expand="md" expanded={this.state.showCollapsed}>
          <div className="nav-left">
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
                  {!this.state.isDesktop ? (
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
                  ) : (
                    <></>
                  )}
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
          </div>
          <Nav.Link
            as="button"
            id="visualize-button"
            disabled={isVisualizing && !this.isVisualizingSearch}
            onClick={async () => {
              hasVisualizedSearch = false;
              this.setState({ showCollapsed: false });
              if (!this.state.isVisualizing) {
                this.setVisualizing();
                this.isVisualizingSearch = true;
                clearSearchAndPath();
                var [visitedNodeRefs, pathNodeRefs] =
                  this.state.chosenAlgorithm.function(nodeRefGrid);
                await visualizeSearch(visitedNodeRefs);
                if (pathNodeRefs) {
                  await visualizePath(pathNodeRefs);
                } else if (this.isVisualizingSearch) {
                  this.setState({ showNoPathError: true });
                }
                if (isVisualizing) hasVisualizedSearch = true;
                setTimeout(() => {
                  this.resetVisualizing();
                }, 5);
                this.isVisualizingSearch = false;
              } else {
                this.resetVisualizing();
                this.isVisualizingSearch = false;
                setTimeout(() => {
                  clearSearchAndPath();
                }, 20);
                hasVisualizedSearch = false;
              }
            }}
          >
            {!this.isVisualizingSearch ? "getPath" : "CANCEL"}
          </Nav.Link>
          <div className="nav-right">
            {this.state.isDesktop ? (
              <NavDropdown title="Clear" align="end">
                <NavDropdown.Item
                  as="button"
                  disabled={isVisualizing}
                  onClick={() => {
                    clearSearchAndPath();
                    clearWallsAndWeights();
                    resetStartAndTargetNodes();
                    hasVisualizedSearch = false;
                  }}
                >
                  All
                </NavDropdown.Item>
                <NavDropdown.Item
                  as="button"
                  disabled={isVisualizing}
                  onClick={() => {
                    clearSearchAndPath();
                    hasVisualizedSearch = false;
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
            ) : (
              <></>
            )}
            <Legend className="legend"></Legend>
          </div>
        </Navbar>
        <Modal
          show={this.state.showNoPathError}
          onHide={() => this.setState({ showNoPathError: false })}
          centered
          fullscreen="sm-down"
        >
          <Modal.Header>
            <Modal.Title>NO PATH HAS BEEN FOUND!</Modal.Title>
            <Nav.Link
              as="button"
              onClick={() => this.setState({ showNoPathError: false })}
            >
              <span className="material-symbols-outlined">close</span>
            </Nav.Link>
          </Modal.Header>
          <Modal.Body>
            This could be because the start or target node is surrounded by
            walls.
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default UI;
