import React, { Component } from "react";
import {
  Modal,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import "object-hash";

class Settings extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleSignUpShow = this.handleSignUpShow.bind(this);
    this.handleSignedInShow = this.handleSignedInShow.bind(this);
    this.handleSignedOutShow = this.handleSignedOutShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.state = {
      show: false,
      signUpShow: false,
      signedInShow: false,
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  changeUsername(e) {
    this.setState({ username: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleClose() {
    this.setState({ show: false });
    this.setState({ signUpShow: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSignUpShow() {
    this.setState({ signUpShow: true });
  }

  handleSignedInShow() {
    this.setState({ signedInShow: true });
  }

  handleSignedOutShow() {
    this.setState({ signedInShow: false });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    // console.log(evt.target.value);
    // console.log(this.username);
    // console.log(this.state.username);
  }

  render() {
    return (
      <div>
        <div style={{ marginLeft: "-20vw", marginTop: "1.3vw" }}>
          {!this.state.signedInShow && (
            <div>
              <Button
                onClick={this.handleShow}
                show={(!this.state.signedInShow).toString()}
              >
                Sign In
              </Button>
              <Button
                onClick={this.handleSignUpShow}
                show={(!this.state.signedInShow).toString()}
                style={{ marginLeft: "1vw" }}
              >
                Sign Up
              </Button>
            </div>
          )}
          {this.state.signedInShow && (
            <div>
              <Button
                onClick={e => {
                  this.handleSignedOutShow();
                  this.props.login(1);
                }}
              >
                Sign out
              </Button>
            </div>
          )}
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form inline>
              <FormGroup>
                <ControlLabel>Username:</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.username}
                  name="username"
                  onChange={this.changeUsername}
                />
                <p />
                <ControlLabel>Password:</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.password}
                  name="password"
                  onChange={this.changePassword}
                />
              </FormGroup>
            </Form>
            <Modal.Footer>
              <Button
                onClick={e => {
                  this.props.login2(this.state.username, this.state.password);
                  this.handleClose();
                  this.handleSignedInShow();
                }}
              >
                Sign in
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.signUpShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form inline>
              <FormGroup>
                <ControlLabel>Username:</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.username}
                  name="username"
                  onChange={this.changeUsername}
                />
                <p />
                <ControlLabel>Password:</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.password}
                  name="password"
                  onChange={this.changePassword}
                />
              </FormGroup>
            </Form>
            <Modal.Footer>
              <Button
                onClick={e => {
                  this.props.register(this.state.username, this.state.password);
                  this.handleClose();
                  this.handleSignedInShow();
                }}
              >
                Sign Up
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Settings;
