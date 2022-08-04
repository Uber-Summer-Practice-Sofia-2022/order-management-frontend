/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Navbar,
  Nav,
} from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRouteSwitch from './AppRouteSwitch';
import './font.css';

function MenuLink({ children, ...props }) {
  return (
    <Link style={{ textDecoration: 'none' }} {...props}>{children}</Link>
  );
}

MenuLink.propTypes = {
  children: PropTypes.node,
};

export default function AppNavBar() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="changeFont">
            <p>Uber </p>
            <p id="delivery">Delivery</p>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as="div"><MenuLink className="navlink" to="/">Home</MenuLink></Nav.Link>
            <Nav.Link as="div"><MenuLink className="navlink" to="/orders">Orders</MenuLink></Nav.Link>
            <Nav.Link as="div"><MenuLink className="navlink" to="/order/status">Order Status</MenuLink></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <AppRouteSwitch />
    </Router>

  );
}
