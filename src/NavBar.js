import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <div>
      <Navbar fixed="top" variant="dark" bg="dark">
        <Nav>
          <Nav.Item>
            <Button>Visualize</Button>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
