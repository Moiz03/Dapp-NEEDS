import React, { useState } from "react";
import { Card, Col, Container, Nav, Row, Image } from "react-bootstrap";

function ProfileComponent(props) {
  let user = props.user;
  console.log(props.user.email);
  return (
    <>
      <Card className="mb-3 mt-4">
        <Row>
          <Col md={6}>{user && <Image src={"icon_new.png"} fluid />}</Col>

          <Col md={6} className="d-flex justify-content-start">
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Container>
                <Row>
                  <Col lg={10} md={10} xs={10}>
                    <Row>
                      <h5
                        style={{
                          fontSize: "medium",
                        }}
                      >
                        {user && user.email}
                      </h5>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default ProfileComponent;
