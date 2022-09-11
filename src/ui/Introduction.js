import React from "react";
import Node from "../node grid/Node";
import { Modal, Button, Nav } from "react-bootstrap";
import "./Introduction.css";

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true,
      curIntroPageIndex: 7,
    };
    this.introPages = [
      {
        title: "WELCOME TO getPath!",
        body: (
          <>
            <div className="intro-body">
              This short introduction will walk you through how to use this
              application.
            </div>
            <div className="intro-body">
              To learn more, press<b className="intro-body-bold"> Next</b>
            </div>
            <div className="intro-body">
              If you already know what you're doing, press
              <b className="intro-body-bold"> Skip</b>.
            </div>
          </>
        ),
      },
      {
        title: "WHAT IS getPath?",
        body: (
          <>
            <div className="intro-body">
              <b className="intro-body-bold" style={{ textTransform: "none" }}>
                getPath<> </>
              </b>
              is an interactive application for visualizing shortest path
              algorithms on graphs.
            </div>
            <div className="intro-body">
              A
              <b className="intro-body-bold">
                <> </>graph<> </>
              </b>
              is a set of
              <b className="intro-body-bold"> nodes </b>
              or vertices connected together by
              <b className="intro-body-bold"> edges</b>. The graph is
              implemented as a grid of hexagonal nodes
              <span className="display-node-border inline-node">
                <Node isDisabled={true}></Node>
              </span>
              in this application.
            </div>
            <div className="intro-body">
              Graphs can be used to represent real world structures such as
              digital maps. I will continue using the map analogy moving
              forward.
            </div>
          </>
        ),
      },
      {
        title: "SHORTEST PATH ALGORITHMS?",
        body: (
          <>
            <div className="intro-body">
              It can often be helpful to find the shortest path between two
              nodes in a graph. For example, you might try to find the way to
              your destination on Google Maps. This is where the
              <b className="intro-body-bold"> shortest path algorithms </b>make
              an entrance!
            </div>
            <div className="intro-body">
              Choose as algorithm by clicking the
              <b className="intro-body-bold"> Algorithm </b>dropdown on the
              navigation bar. There are four choices available:
            </div>
          </>
        ),
      },
      {
        title: "INTRODUCING THE ALGORITHMS",
        body: (
          <>
            <div className="intro-body">
              <b className="intro-body-bold">Dijkstra's Algorithm: </b>An
              algorithm which relies solely on the
              <b className="intro-body-bold"> weight </b>of the nodes and
              <b className="intro-body-bold">
                <> </>searches equally in all directions
              </b>
              , which
              <b className="intro-body-bold"> guarantees the shortest path</b>.
            </div>
            <div className="intro-body">
              <b className="intro-body-bold">A* Algorithm: </b>An algorithm
              which includes a <b className="intro-body-bold">heuristic </b>
              distance to the target node along with the
              <b className="intro-body-bold"> weight</b> of the nodes, which
              gives it a
              <b className="intro-body-bold"> better sense of direction </b>and
              <b className="intro-body-bold"> guarantees the shortest path</b>.
            </div>
            <div className="intro-body">
              <b className="intro-body-bold">Greedy Best First Search: </b>An
              algorithm which relies solely on the
              <b className="intro-body-bold"> heuristic</b> distance, which
              makes it <b className="intro-body-bold">fast</b> but
              <b className="intro-body-bold">
                <> </>does not guarantee the shortest path
              </b>
              .
            </div>
            <div className="intro-body">
              <b className="intro-body-bold">Bidirectional Dijkstra's: </b>
              Dijkstra's algorithm but in both directions, which
              <b className="intro-body-bold"> reduces the search radius </b>
              and
              <b className="intro-body-bold"> guarantees the shortest path</b>.
            </div>
          </>
        ),
      },
      {
        title: "INCREASING THE DIFFICULTY",
        body: (
          <>
            <div className="intro-body">
              So, you want to make the search for the shortest path more
              interesting. You can do so using walls and weights!
            </div>
            <div className="intro-body">
              <b className="intro-body-bold">Wall</b>
              <span className="display-node-border inline-node">
                <Node isWall={true} isDisabled={true}></Node>
              </span>
              nodes provide an <b className="intro-body-bold">impenetrable </b>
              obstacle when searching, forcing a different path (or no path).
              They have an infinite weight.
            </div>
            <div className="intro-body">
              You can also make some nodes more difficult to pass through using{" "}
              <b className="intro-body-bold">weight </b>
              nodes. Weight nodes come in three flavours:{" "}
              <b className="intro-body-bold">5 lbs</b>
              <span className="display-node-border inline-node">
                <Node isSmallWeight={true} isDisabled={true}></Node>
              </span>
              , <b className="intro-body-bold">10 lbs</b>
              <span className="display-node-border inline-node">
                <Node isMediumWeight={true} isDisabled={true}></Node>
              </span>
              , and <b className="intro-body-bold">25 lbs</b>
              <span className="display-node-border inline-node">
                <Node isLargeWeight={true} isDisabled={true}></Node>
              </span>
              . (Regular
              <span className="display-node-border inline-node">
                <Node isDisabled={true}></Node>
              </span>
              nodes have a weight of <b className="intro-body-bold">2.5 lbs</b>
              .)
            </div>
            <div className="intro-body">
              <b className="intro-body-bold">Click and drag </b>on the grid to
              place wall or weight nodes.
              <b className="intro-body-bold"> Toggle </b>between wall and weight
              nodes using the button group in the navigation bar.
            </div>
          </>
        ),
      },
      {
        title: "CREATING A MAZE",
        body: (
          <>
            <div className="intro-body">
              To easily make searching more interesting, choose one of the
              provided mazes by clicking the
              <b className="intro-body-bold"> mazes </b>
              dropdown!
            </div>
            <div className="intro-body">
              The <b className="intro-body-bold">labyrinth</b> is an ordered
              maze, generated using a variation of prim's minimum spanning tree
              algorithm. There is only one path between any two nodes in a
              labyrinth.
            </div>
            <div className="intro-body">
              You can also generate
              <b className="intro-body-bold"> randomized walls</b> or
              <b className="intro-body-bold"> randomized weights</b>!
            </div>
          </>
        ),
      },
      {
        title: "FINDING THE TARGET",
        body: (
          <>
            <div className="intro-body">
              Once you're done setting the stage, it's time to search for the
              shortest path. Click the
              <b className="intro-body-bold" style={{ textTransform: "none" }}>
                <> </>getPath<> </>
              </b>
              button and watch the magic unfold!
            </div>
            <div className="intro-body">
              The search will begin at the
              <b className="intro-body-bold"> start</b>
              <span className="display-node-border inline-node">
                <Node isStart={true} isDisabled={true}></Node>
              </span>
              node and end at the <b className="intro-body-bold">target</b>
              <span className="display-node-border inline-node">
                <Node isTarget={true} isDisabled={true}></Node>
              </span>
              node.
            </div>
            <div className="intro-body">
              As the search progresses,
              <b className="intro-body-bold"> visited</b>
              <span className="display-node-border inline-node">
                <Node isVisited={true} isDisabled={true}></Node>
              </span>
              nodes will appear to indicate the areas that have been searched.
              Once the target node has been reached,
              <b className="intro-body-bold"> path</b>
              <span className="display-node-border inline-node">
                <Node isPath={true} isDisabled={true}></Node>
              </span>
              nodes will appear along the shortest path, from start to target!
            </div>
          </>
        ),
      },
      {
        title: "NOW IT'S YOUR TURN!",
        body: (
          <>
            <div className="intro-body">
              <b className="intro-body-bold">
                Thanks for staying through this introduction. Now it's time to
                put to use all you've learned!
              </b>
            </div>
            <div className="intro-body">
              If you want to access this introduction again,
              <b className="intro-body-bold"> refresh </b>
              the page!. If you want to remind yourself what all the symbols
              mean, just click the <b className="intro-body-bold"> Legend ? </b>
              button on the navigation bar.
            </div>
            <div className="intro-body">
              If you would like to look at the
              <b className="intro-body-bold"> source code </b>
              for this project, click the
              <b className="intro-body-bold"> GitHub </b>
              icon below.
            </div>
            <div className="intro-body">
              If you want to learn more about me or want to tell me anything,
              click the <b className="intro-body-bold"> LinkedIn </b>
              icon below!
            </div>
            <div className="intro-body">
              Thanks again for checking out this project.
              <b className="intro-body-bold"> Goodbye and enjoy!</b>
            </div>
          </>
        ),
      },
    ];
    this.curIntroPage = this.introPages[this.state.curIntroPageIndex];
  }
  render() {
    return (
      <Modal
        show={this.state.showIntro}
        onHide={() => this.setState({ showIntro: false })}
        backdrop="static"
        centered
      >
        <Modal.Header>
          <Modal.Title>{this.curIntroPage.title}</Modal.Title>
          <div className="intro-page-number">
            {this.state.curIntroPageIndex + 1}/{this.introPages.length}
          </div>
        </Modal.Header>
        <Modal.Body>{this.curIntroPage.body}</Modal.Body>
        <Modal.Footer>
          {this.state.curIntroPageIndex > 0 ? (
            <Button
              className="modal-button shadow-none"
              onClick={() => {
                this.curIntroPage =
                  this.introPages[this.state.curIntroPageIndex - 1];
                this.setState({
                  curIntroPageIndex: this.state.curIntroPageIndex - 1,
                });
              }}
            >
              <span className="modal-button-icon material-symbols-outlined">
                chevron_left
              </span>
              Back
            </Button>
          ) : (
            <></>
          )}
          {this.state.curIntroPageIndex == this.introPages.length - 1 ? (
            <div className="contact-links">
              <Nav.Link
                className="contact-link"
                href="https://github.com/BazimAzeem/getPath/tree/master/src"
                target="_blank"
              >
                <ion-icon name="logo-github"></ion-icon>
              </Nav.Link>
              <Nav.Link
                className="contact-link"
                href="https://www.linkedin.com/in/bazim-azeem-2970b3202/"
                target="_blank"
              >
                <ion-icon name="logo-linkedin"></ion-icon>
              </Nav.Link>
            </div>
          ) : (
            <></>
          )}
          <Button
            className="modal-button shadow-none"
            onClick={() => this.setState({ showIntro: false })}
          >
            {this.state.curIntroPageIndex < this.introPages.length - 1
              ? "Skip"
              : "Finish"}
          </Button>
          {this.state.curIntroPageIndex < this.introPages.length - 1 ? (
            <Button
              className="modal-button shadow-none"
              variant="primary"
              onClick={() => {
                this.curIntroPage =
                  this.introPages[this.state.curIntroPageIndex + 1];
                this.setState({
                  curIntroPageIndex: this.state.curIntroPageIndex + 1,
                });
              }}
            >
              Next
              <span className="modal-button-icon material-symbols-outlined">
                chevron_right
              </span>
            </Button>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Introduction;
