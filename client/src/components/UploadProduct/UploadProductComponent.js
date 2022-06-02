import React, { useState, useEffect } from "react";
import { Button, Container, Modal, Form, ProgressBar } from "react-bootstrap";
import "./UploadProductComponent.css";
import getWeb3 from "../../getWeb3";
import ProductsContract from "../../contracts/Products.json";


function UploadProductComponent(props) {
  const [product_details, setProductDetails] = useState({
    title: "",
    description: "",
    price: 0,
    rent: 0,
  });

  const [meta, setMeta] = useState({
    web3: null, accounts: null, contract: null
  });

  useEffect(async()=>{
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ProductsContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ProductsContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setMeta({ web3: web3, accounts: accounts, contract: instance });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }, []);

  const postProductApi = async (name, description, price, rent) => {
    console.log(meta);
    const { accounts, contract } = meta;
    await contract.methods.addProduct(name, description, price, rent).send({from: accounts[0]})
    .on('confirmation', (confirmationNumber, receipt)=>{
      alert("Product Posted Successfully");
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...product_details,
      [name]: value,
    });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const uploadProduct = async (e) => {
    e.preventDefault();
    postProductApi(product_details.title, product_details.description, product_details.price, product_details.rent)
    .then((res)=>{
      console.log("Product Posted");
    }).catch((err)=>{
      console.log("Transaction Failed");
    })
  };

  return (
    <>
      <Container>
        <Container>
          <Form
            onSubmit={uploadProduct}
            method="POST"
            encType="multipart/form-data"
          >
            <Form.Group className="mb-3">
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Title"
                id="title"
                name="title"
                onChange={handleChange}
              />
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Price"
                id="price"
                name="price"
                onChange={handleChange}
              />
              <Form.Control
                type="number"
                placeholder="Rent"
                id="rent"
                name="rent"
                onChange={handleChange}
              />
            </Form.Group>

            <textarea
              className="form-control mb-3"
              rows="5"
              placeholder="Description"
              id="description"
              name="description"
              onChange={handleChange}
            ></textarea>
            <Button
              variant="primary"
              onClick={handleClose}
              className="mb-3 my_btn_upload"
              type="submit"
            >
              Upload
            </Button>
          </Form>
        </Container>
      </Container>
    </>
  );
}

export default UploadProductComponent;
