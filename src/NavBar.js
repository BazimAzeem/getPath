import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Container,
} from "react-bootstrap";
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
      showLegend: false,
    };
  }

  toggleVisualizing() {
    this.setState({ isVisualizing: !this.state.isVisualizing });
    isVisualizing = !isVisualizing;
  }

  render() {
    return (
      <Navbar expand="lg">
        <Nav.Link
          onClick={() => {
            this.setState({ showLegend: !this.state.showLegend });
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
        <Navbar.Toggle>
          <span className="material-symbols-outlined">menu</span>
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown title="Algorithms">
              <NavDropdown.Item>Action</NavDropdown.Item>
              <NavDropdown.Item>Another action</NavDropdown.Item>
              <NavDropdown.Item>Something else here</NavDropdown.Item>
              <NavDropdown.Item>Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
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
              href="#"
            >
              {!this.state.isVisualizing ? "Visualize" : "Cancel"}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                clearWallsAndWeights();
              }}
              href="#"
            >
              Clear Walls And Weights
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                clearSearchAndPath();
              }}
              href="#"
            >
              Clear Search And Path
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
