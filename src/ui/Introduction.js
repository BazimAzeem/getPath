import React from "react";
// import { Modal, Button } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true,
    };
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
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.setState({ showIntro: false })}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => this.setState({ showIntro: false })}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Introduction;
