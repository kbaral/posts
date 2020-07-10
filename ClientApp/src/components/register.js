import React, { Component } from "react";
import { Button, Alert } from "reactstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

export class Register extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let isloggedIn = true;
    if (token == null) {
      isloggedIn = false;
    }
    this.state = {
      name: "",
      last_name: "",
      email: "",
      password: "",
      success: false,
      loading: false,
      isloggedIn,
      error: "",
      successMessage: ""
    };
  }

  handleSuccessfulAuth(data) {
    console.log("data", data);
    localStorage.setItem("token", data.authToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    this.setState(() => ({ isLoggedIn: true }));
    window.location.href = "/";
  }
  handleAlreadyLoggedIn() {
    window.location.href = "/";
  }
  handleClick(event) {
    console.log(
      "values",
      this.state.name,
      this.state.email,
      this.state.password
    );
    //To be done:check for empty values before hitting submit

    var user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.setState({ loading: true }, () => {
      axios
        .post("/api/v1/user/register", user)
        .then(response => {
          debugger;
          console.log("log in", response);
          if (response.status === 200) {
            if (response.data.success === false) {
              this.setState(() => ({
                error: response.data.errorMessage,
                loading: false
              }));
              console.log(response.data.errorMessage);
            } else {
              this.setState(() => ({
                isLoggedIn: true,
                loading: false,
                success: true,
                successMessage:
                  "Registered Successfully. Automatically logged in"
              }));
              this.handleSuccessfulAuth(response.data);
            }
          } else {
            this.setState({ error: "Username does not exist !" });
          }
        })
        .catch(err => {
          this.setState({ error: "Oops, something went wrong !" });
          console.log(err);
        })
        .finally(() => {
          this.setState(() => ({ loading: false }));
        });
    });
  }
  render() {
    const loading = this.state.loading;
    if (this.state.isloggedIn === true) {
      this.handleAlreadyLoggedIn();
    }
    return (
      <div>
        {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        {this.state.successMessage && (
          <Alert color="success">{this.state.successMessage}</Alert>
        )}
        <div>
          {loading && (
            <Spinner animation="grow" variant="success">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <Form>
            <Form.Row>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={event =>
                    this.setState({ name: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={event =>
                    this.setState({ email: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>

            <Button
              label="Submit"
              className="btn btn-primary"
              onClick={event => this.handleClick(event)}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
