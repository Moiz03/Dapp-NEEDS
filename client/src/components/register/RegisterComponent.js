import React, { useState, useEffect } from "react";
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import "./RegisterComponent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import getWeb3 from "../../getWeb3";
import UserContract from "../../contracts/Users.json";

function RegisterComponent({ setKey, setLoginUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });
 

  const [meta, setMeta] = useState({
    web3: null, accounts: null, contract: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(async()=>{
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = UserContract.networks[networkId];
      const instance = new web3.eth.Contract(
        UserContract.abi,
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

  
  const runExample = async (username, pass) => {
    console.log(meta);
    const { accounts, contract } = meta;
    await contract.methods.createUser(username, pass).call({from: accounts[0]}, async(err, res)=>{
      if(res){
        await contract.methods.createUser(username, pass).send({from: accounts[0]})
        .on('receipt', (receipt)=>{
          alert("Account Created");
          setKey("login");
          navigate("/login");
        })
      }else{
        alert("Account exists on this address");
      }
    })

  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password, reEnterPassword } = user;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (validator.isEmail(email)) {
      if (name && email && password === reEnterPassword) {
        if (password.match(passw)) {
          console.log("here");
          runExample(meta.web3.utils.asciiToHex(email), meta.web3.utils.asciiToHex(password)).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          });
        } else {
          alert("Invalid Input");
        }
      } else {
        alert(
          "password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        );
      }
    } else {
      alert("Invalid Email");
    }
  };
  
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={user.name}
            id="name"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicReEterPassword">
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            id="reEnterPassword"
            name="reEnterPassword"
            value={user.reEnterPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="my_btn_reg"
          onClick={handleRegister}
        >
          Create an account
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterComponent;
