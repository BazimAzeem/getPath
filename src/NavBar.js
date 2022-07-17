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
import { aStar } from "./search algorithms/aStar";
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
    this.algorithms = [
      {
        name: "Djikstra's",
        function: djikstra,
      },
      {
        name: "A*",
        function: aStar,
      },
    ];

    this.state = {
      isVisualizing: false,
      showCollapsed: false,
      showLegend: false,
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

    this.legendEntrees = [
      {
        node: (
          <div className="display-node-border legend-entree__node">
            <Node isDisabled={true}></Node>{" "}
          </div>
        ),
        title: "Regular Node",
        description: "The default node with a weight of 2.5 lbs",
      },

      {
        node: (
          <div className="legend-entree__node">
            <Node isWall={true} isDisabled={true}></Node>
          </div>
        ),
        title: "Wall Node",
        description: "A node with a weight of infinity (impenetrable)",
      },
      {
        node: (
          <div className="display-node-border legend-entree__node">
            <Node isSmallWeight={true} isDisabled={true}></Node>
          </div>
        ),
        title: "Small Weight Node",
        description: "A node with a weight of 5 lbs",
      },
      {
        node: (
          <div className="display-node-border legend-entree__node">
            <Node isMediumWeight={true} isDisabled={true}></Node>
          </div>
        ),
        title: "Medium Weight Node",
        description: "A node with a weight of 10 lbs",
      },
      {
        node: (
          <div className="display-node-border legend-entree__node">
            <Node isLargeWeight={true} isDisabled={true}></Node>
          </div>
        ),
        title: "Large Weight Node",
        description: "A node with a weight of 25 lbs",
      },
      {
        node: (
          <div className="display-node-border legend-entree__node">
            <Node isStart={true} isDisabled={true}></Node>
          </div>
        ),
        title: "Start Node",
        description: "The node where searching begins",
      },
      {
        node: (
          <div className="display-node-border legend-entree__node">
            <Node isTarget={true} isDisabled={true}></Node>
          </div>
        ),
        title: "Target Node",
        description: "The node which is searched for",
      },
      {
        node: (
          <div className="display-node-border legend-entree__node">
            <Node isVisited={true} isDisabled={true}></Node>
          </div>
        ),
        title: "Visited Node",
        description: "A node which has been visited during searching",
      },
      {
        node: (
          <div className="legend-entree__node">
            <Node isPath={true} isDisabled={true}></Node>
          </div>
        ),
        title: "Path Node",
        description: "A node which is part of the shortest path",
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
              <NavDropdown
                title={"Algorithm: " + this.state.chosenAlgorithm.name}
              >
                {this.algorithms.map((algorithm, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() =>
                      this.setState({ chosenAlgorithm: algorithm })
                    }
                  >
                    {algorithm.name}
                  </NavDropdown.Item>
                ))}
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
                    var targetNodeRef = await visualizeSearch(
                      this.state.chosenAlgorithm.function
                    );
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
          <Offcanvas.Body className="legend-body">
            {this.legendEntrees.map((legendEntree, index) => (
              <article key={index} className="legend-entree">
                <div className="legend-entree__heading">
                  {legendEntree.node}
                  <h5 className="legend-entree__title">{legendEntree.title}</h5>
                </div>
                <p className="legend-entree__description">
                  {legendEntree.description}
                </p>
              </article>
            ))}
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>
    );
  }
}

export default NavBar;
