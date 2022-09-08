import React from "react";
import Node from "../node grid/Node";
import { Modal, Button } from "react-bootstrap";
import "./Introduction.css";

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true,
      curIntroPageIndex: 0,
    };
    this.introPages = [
      {
        title: "WELCOME TO getPath!",
        body: (
          <>
            <p className="intro-body">
              This short introduction will walk you through how to use this
              application.
              {/* <span className="display-node-border inline-node">
                <Node isSmallWeight={true} isDisabled={true}></Node>
              </span> */}
              This is a random display node tht im placing here
            </p>
            <p className="intro-body">
              To learn more, press<b className="intro-body-bold"> Next</b>.wwww
              wwwwww www www ww w ww wwwwww wwww www wwwww wwww
            </p>
            <p className="intro-body">
              If you already know what you're doing, press
              <b className="intro-body-bold"> Skip</b>.
            </p>
          </>
        ),
      },
      { title: "WHAT IS getPath?" },
      { title: "THE ALGORITHMS" },
      { title: "INCREASE THE DIFFICULTY" },
      { title: "CREATE A MAZE" },
      { title: "FIND THE TARGET" },
      { title: "ABOUT THE CREATOR" },
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
        fullscreen="sm-down"
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
