import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
  Row,
  Col,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
function Header(props) {
  return (
    <Navbar
      className="color-nav d-none d-xl-block"
      variant="dark"
      sticky="top"
      expand="md"
    >
      <Container fluid>
        <Col xl={2}>
          <Navbar.Brand>
            <img
              src="needs.webp"
              width="150px"
              height="70px"
              className="d-inline-block align-top"
              alt="Needs Logo Here"
            />
          </Navbar.Brand>
        </Col>

        <Navbar.Toggle />
        <Col xl={10}>
          <Row>
            <Navbar.Collapse>
              <Col xl={1}>
                <NavDropdown
                  title={<span className=" my-auto">Browse</span>}
                  id="navbarScrollingDropdown"
                  aria-setsize="120px"
                ></NavDropdown>
              </Col>
              <Col xl={9}>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-4 my_search"
                    aria-label="Search"
                  />
                </Form>
              </Col>
              <Col xl={2}>
                <NavDropdown
                  title={<span className=" my-auto mx-auto">Profile</span>}
                  id="navbarScrollingDropdown"
                  aria-setsize="120px"
                >
                  <Container className="px-0">
                    <Row>
                      <Col>
                        <h4 className="mx-3 link_side_bar_header">
                          {props.username}
                        </h4>
                        <ListGroupItem className="p-0">
                          <Nav.Link
                            className="link_side_bar_header"
                            href="/profile"
                          >
                            Profile
                          </Nav.Link>
                        </ListGroupItem>
                        <ListGroupItem className="p-0">
                          <Nav.Link
                            className="link_side_bar_header"
                            href="/"
                            onClick={() => props.logout()}
                          >
                            Sign Out
                          </Nav.Link>
                        </ListGroupItem>
                      </Col>
                    </Row>
                  </Container>
                </NavDropdown>
              </Col>
            </Navbar.Collapse>
          </Row>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Header;
