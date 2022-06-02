import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Col, Row, Tab, Nav, Container } from "react-bootstrap";
import "./homepage.css";
import Banner from "../banner/Banner";
import Header from "../Header/Header";
import UploadProductComponent from "../UploadProduct/UploadProductComponent";
import StatisticsComponent from "../Statistics/StatisticsComponent";

function Homepage(props) {
  const navigate = useNavigate();


  return (
    <>
      <Header logout={props.logout} username={props.user} />
      <Container className="mb-5">
        {" "}
        <Banner />
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item className="link_side_bar">
                  <Nav.Link eventKey="first" className="link_side_bar">
                    Products
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className="link_side_bar">
                    Post an Ad for Product
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" className="link_side_bar">
                    Owned Products
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth" className="link_side_bar">
                    Rented Products
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className="mt-5">
                <Tab.Pane eventKey="first">
                  <StatisticsComponent email={props.user.email} type={0}/>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <h3>Post an AD for Product</h3>
                  <UploadProductComponent user={props.user} />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <h3>Products You Own</h3>
                  <StatisticsComponent email={props.user.email} type={1}/>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <h3>Products You Rented</h3>
                  <StatisticsComponent email={props.user.email} type={2}/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
}

export default Homepage;
