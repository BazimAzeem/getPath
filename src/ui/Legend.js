import React from "react";
import Node from "../node grid/Node";
import { Nav, Offcanvas } from "react-bootstrap";
import "./Legend.css";

class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLegend: false,
    };

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

  render() {
    return (
      <div>
        <Nav.Link
          className="legend-button"
          as="button"
          onClick={() => this.setState({ showLegend: true })}
        >
          <span className="material-symbols-outlined">help</span>
        </Nav.Link>
        <Offcanvas
          placement="bottom"
          show={this.state.showLegend}
          onHide={() => this.setState({ showLegend: false })}
        >
          <Offcanvas.Header>
            <Nav.Link
              as="button"
              onClick={() => this.setState({ showLegend: false })}
            >
              <span className="material-symbols-outlined">close</span>
            </Nav.Link>
            <Offcanvas.Title>Legend</Offcanvas.Title>
            <div className="contact-links">
              <Nav.Link
                style={{ marginRight: 0 }}
                href="https://github.com/BazimAzeem/getPath/tree/master/src"
                target="_blank"
              >
                <ion-icon name="logo-github"></ion-icon>
              </Nav.Link>
              <Nav.Link
                href="https://www.linkedin.com/in/bazim-azeem-2970b3202/"
                target="_blank"
              >
                <ion-icon name="logo-linkedin"></ion-icon>
              </Nav.Link>
            </div>
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
      </div>
    );
  }
}

export default Legend;
