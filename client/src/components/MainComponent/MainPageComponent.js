import React, { useState, useEffect } from "react";
import { Row, Container, Col, Tabs, Tab, Image, Card } from "react-bootstrap";
import SignInComponent from "../login/SignInComponent";
import RegisterComponent from "../register/RegisterComponent";
import "./MainPageComponent.css";

function MainPageComponent(props) {
  const [key, setKey] = useState(props.selected_page);

  return (
    <Container fluid className="my_panel">
      <Row>
        <Col lg={6} className="p-0 m-0">
          <Container fluid className="p-0 m-0">
            <Card className="bg-light text-white">
              <Card.Img src="image_3.jpeg" width={"100%"} height={"720px"} />
              <Card.ImgOverlay className="text-center d-flex flex-column justify-content-center">
                <Card.Title className="text1_on_banner">
                  Welcome to Our Website
                </Card.Title>
                <Card.Text className="text2_on_banner">
                  Explore the new Era of Ecommerce by paying through your CryptoWallet
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Container>
        </Col>
        <Col lg={6} className="mt-5 p-5 ">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="register" title="Register" tabClassName="my_btn">
              <RegisterComponent setKey={setKey} setLoginUser={props.setLoginUser}/>
            </Tab>
            <Tab eventKey="login" title="Sign In" tabClassName="my_btn">
              <SignInComponent setLoginUser={props.setLoginUser} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default MainPageComponent;
