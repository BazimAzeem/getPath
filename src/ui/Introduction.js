import React from "react";
import { Modal, Button, Nav } from "react-bootstrap";
import "./Introduction.css";

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true,
      curIntroPageIndex: 0,
    };
    this.introPages = [{ title: "Welcome to BlahBlahBlah!" }, {}, {}, {}, {}];
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
          <Modal.Title>
            {this.state.curIntroPageIndex + 1}/{this.introPages.length}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>I'll put some intro content here, just wait.</Modal.Body>
        <Modal.Footer>
          {this.state.curIntroPageIndex > 0 ? (
            <Button
              className="modal-button shadow-none"
              onClick={() =>
                this.setState({
                  curIntroPageIndex: this.state.curIntroPageIndex - 1,
                })
              }
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
              onClick={() =>
                this.setState({
                  curIntroPageIndex: this.state.curIntroPageIndex + 1,
                })
              }
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
