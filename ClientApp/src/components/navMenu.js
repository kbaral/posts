import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let isloggedIn = true;
    let name = "";
    const user = localStorage.getItem("user");
    if (token == null) {
      isloggedIn = false;
    }
    if (user != null && user !== undefined && user !== "undefined") {
      name = JSON.parse(user).name;
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isloggedIn,
      name
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              Blogs
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Home
                  </NavLink>
                </NavItem>

                <NavItem>
                  {this.state.isloggedIn ? (
                    <NavLink
                      tag={Link}
                      onClick={event => this.logout(event)}
                      className="text-dark"
                      to="/login"
                    >
                      Log out
                    </NavLink>
                  ) : (
                    <NavLink tag={Link} className="text-dark" to="/login">
                      Log In
                    </NavLink>
                  )}
                </NavItem>

                <NavItem>
                  {this.state.isloggedIn ? (
                    <NavLink tag={Link} className="text-dark" to="/">
                      Welcome <strong>{this.state.name} !</strong>
                    </NavLink>
                  ) : (
                    <NavLink tag={Link} className="text-dark" to="/register">
                      Register
                    </NavLink>
                  )}
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
