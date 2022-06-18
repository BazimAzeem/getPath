import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import { visualizeSearch } from "./NodeGrid";
import { djikstra } from "./search algorithms/djikstra";

const NavBar = () => {
  return (
    <div>
      <Navbar fixed="top" variant="dark" bg="dark">
        <Nav>
          <Nav.Item>
            <Button
              onClick={() => {
                visualizeSearch(djikstra);
              }}
            >
              Visualize
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
