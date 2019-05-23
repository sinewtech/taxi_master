import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { MenuIsOpen: false };
  }
  togglemenu = () => {
    this.setState({
      MenuIsOpen: !this.state.MenuIsOpen,
    });
  };
  render() {
    return (
      <Navbar
        className="heading"
        style={{ marginBottom: "120px" }}
        color="primary"
        expand="md"
        fixed="top"
        dark>
        <NavbarBrand href="/" style={{ color: "white", fontWeight: "bolder" }}>
          <NavLink to="/">
            <div style={{ textAlign: "center" }}>
              <img alt="Logo" style={{ height: "fill", width: 75 }} src={"/logo512.png"} />
            </div>
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={this.togglemenu} />
        <Collapse isOpen={this.state.MenuIsOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" style={{ color: "black" }} to="/paga_cada_conductor">
                Paga a cada conductor
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
export default Header;
