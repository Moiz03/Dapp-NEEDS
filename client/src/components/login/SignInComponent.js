import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "./SignInComponent.css";
import getWeb3 from "../../getWeb3";
import UserContract from "../../contracts/Users.json";

function SignInComponent(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
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
    await contract.methods.verifyUser(username, pass).call({from: accounts[0]}, async (err, res)=>{
      console.log(meta.web3.utils.hexToUtf8(res.user) + " rffdf");
      if(res){
        await contract.methods.verifyUser(username, pass).send({from: accounts[0]})
        .on('transactionHash', (hash)=>{
          props.setLoginUser(meta.web3.utils.hexToUtf8(res.user));
          localStorage.setItem("user", meta.web3.utils.hexToUtf8(res.user));
          alert("Sign In Successful");
          navigate("/");
        })
      }else{
        alert("Username or Password is wrong");
      }
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (email && password) {
      runExample(meta.web3.utils.asciiToHex(email), meta.web3.utils.asciiToHex(password))
      .then((res)=>{
        console.log("hereddq");
        navigate("/");
      }).catch((err)=>{
        console.log("here1");
        console.log(err);
      });
    } else {
      alert("Invalid Input");
    }
  };
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
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
        <Button
          variant="primary"
          type="submit"
          className="my_btn_sigin"
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </Form>
    </Container>
  );
}

export default SignInComponent;
