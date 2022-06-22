import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import { visualizeSearch, visualizePath, nodeRefGrid } from "./NodeGrid";
import { djikstra } from "./search algorithms/djikstra";

const NavBar = () => {
  return (
    <div>
      <Navbar fixed="top" variant="dark" bg="dark">
        <Nav>
          <Nav.Item>
            <Button
              onClick={async () => {
                var targetNodeRef = await visualizeSearch(djikstra);
                var pathNodeRefs = await visualizePath(targetNodeRef);
                console.log("Finished  visualize");
              }}
            >
              Visualize
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button
              onClick={() => {
                for (const nodeRefArray of nodeRefGrid) {
                  for (const nodeRef of nodeRefArray) {
                    nodeRef.current.resetToDefault();
                  }
                }
              }}
            >
              Clear
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
