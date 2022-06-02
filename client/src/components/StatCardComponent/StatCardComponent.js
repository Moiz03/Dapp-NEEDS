import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  Button,
  Modal,
  Form,
  Nav,
} from "react-bootstrap";
import "./StatCardComponent.css";

function StatCardComponent(props) {
  const [misc, setMisc] = useState({
    days: 0,
    review: "",
    total: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMisc({
      ...misc,
      [name]: value,
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const title = props.data.name;
  const description = props.data.description;
  const price = props.data.price;
  const rent = props.data.rent;
  const id = props.data.id;
  const reviews = props.data.reviews;
  const meta = props.meta;
  const type = props.type;

  const buyProductApi = async (id) => {
    console.log(meta);
    const { accounts, contract } = meta;
    await contract.methods.buyProduct(id).send({from: accounts[0]});
  };

  const rentProductApi = async (id) => {
    console.log(meta);
    const { accounts, contract } = meta;
    
    await contract.methods.rentProduct(id).send({from: accounts[0]});
  };

  const unRentProductApi = async (id) => {
    console.log(meta);
    const { accounts, contract } = meta;
    await contract.methods.unRentProduct(id).send({from: accounts[0]});
  };

  const postReviewAPI = async(index, rev) => {
    console.log(meta);
    const { accounts, contract } = meta;
    await contract.methods.addReview(index, rev).send({from: accounts[0]})
    .on('receipt', (receipt)=>{
      alert("Review Posted Successfully");
    })
  };

  const buyProduct = () => {
    buyProductApi(id).then((res)=>{
      console.log("Item Bought");
    }).catch((err)=>{
      console.log("Transaction Failed");
    })
  }

  const rentProduct = () => {
    rentProductApi(id).then((res)=>{
      console.log("Item Rented");
    }).catch((err)=>{
      console.log("Transaction Failed");
    })
  }

  const postReview = () => {
    postReviewAPI(id, misc.review).then((res)=>{
      console.log("Review Posted");
    }).catch((err)=>{
      console.log("Review Not Posted");
    })
  }

  const unRentProduct = async()=>{
    unRentProductApi(id).then((res)=>{
      console.log("Item Rented");
    }).catch((err)=>{
      console.log("Transaction Failed");
    }) 
  }


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Total Amount: {price} ETH
          </p>
          <Button variant="secondary" onClick={buyProduct}>
            Proceed
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
          Number of Days for Rent
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Number of Days for Rent"
            value={misc.days}
            id="days"
            name="days"
            onChange={handleChange}
          />
        </Form.Group>
        </Form>
           <p>
            Total Rent: {rent * misc.days} ETH
          </p>
          <Button variant="secondary" onClick={rentProduct}>
            Proceed
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Give a Review </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
          Review
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Write a Review"
            value={misc.review}
            id="review"
            name="review"
            onChange={handleChange}
          />
        </Form.Group>
        </Form>
          <Button variant="primary" onClick={postReview}>
            Post
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Card style={{ width: "18rem", border: "2px solid green" }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
          Description: {description}
          </Card.Subtitle>
          <Card.Text>Reviews: {reviews}</Card.Text>
          <Card.Text>Price: {price}</Card.Text>
          <Card.Text>Rent Price per Day: {rent}</Card.Text>
          {type == 0 && 
          <>
          <Button className="mb-3 my_btn_upload" onClick={handleShow}>
            Buy Product
          </Button>
          <Button className="mb-3 my_btn_upload" onClick={handleShow2}>
            Rent Product
          </Button>
          </>
          }
          {type > 0 && 
          <>
          <Button className="mb-3 my_btn_upload" onClick={handleShow3}>
            Give Review
          </Button>
          <Button className="mb-3 my_btn_upload" onClick={unRentProduct}>
            Un Rent
          </Button>
          </>
          }   
        </Card.Body>
      </Card>
 
    </>
  );
}

export default StatCardComponent;
