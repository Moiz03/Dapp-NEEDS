import React, { useState, useEffect } from "react";
import { Row, Col, Container, CardGroup, Button } from "react-bootstrap";
import StatCardComponent from "../StatCardComponent/StatCardComponent";
import getWeb3 from "../../getWeb3";
import ProductsContract from "../../contracts/Products.json";

function StatisticsComponent(props) {
  const [products, setrows] = useState({ dataRows: null });
  const [meta, setMeta] = useState({
    web3: null, accounts: null, contract: null
  });
  const type = props.type;

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

  const getAllProducts = async () => {
    console.log(meta);
    let prods = []
    const { accounts, contract } = meta;
    await contract.methods.getProductsCount().call({from: accounts[0]}, async (err, res)=>{
      for (let index = 0; index < res; index++){
        await contract.methods.getProduct(index).call({from: accounts[0]},(err, product)=>{
          console.log(product.name + " ghere");
          if(product.name != ""){
          prods.push({
            "id": index,
            "name": product.name,
            "price": product.pr,
            "rent": product.ren,
            "description": product.desc,
            "reviews": product.reviews,
          })
        }
        }); 
      }
      console.log(prods);
      setrows({dataRows: prods});
    });
    console.log(prods);
  };

  const getMyProducts = async () => {
    console.log(meta);
    let prods = []
    const { accounts, contract } = meta;
    await contract.methods.getProductsCount().call({from: accounts[0]}, async (err, res)=>{
      for (let index = 0; index < res; index++){
        await contract.methods.getMyProducts(index).call({from: accounts[0]},(err, product)=>{
          console.log(product.name + " ghere");
          if(product.name != ""){
          prods.push({
            "id": index,
            "name": product.name,
            "price": product.pr,
            "rent": product.ren,
            "description": product.desc,
            "reviews": product.reviews,
          })
        }
        }); 
      }
      console.log(prods);
      setrows({dataRows: prods});
    });
    console.log(prods);
  };

  const getRentedProducts = async () => {
    console.log(meta);
    let prods = []
    const { accounts, contract } = meta;
    await contract.methods.getProductsCount().call({from: accounts[0]}, async (err, res)=>{
      for (let index = 0; index < res; index++){
        await contract.methods.getMyProductsRent(index).call({from: accounts[0]},(err, product)=>{
          console.log(product.name + " ghere");
          if(product.name != ""){
          prods.push({
            "id": index,
            "name": product.name,
            "price": product.pr,
            "rent": product.ren,
            "description": product.desc,
            "reviews": product.reviews,
          })
        }
        });
      }
      console.log(prods);
      setrows({dataRows: prods});
    });
    console.log(prods);
  };

  const allCards = (data) => {
    let data_got = data.map((item, index) => {
      return (
        <CardGroup lg={3} md={12} className="mb-3">
        <StatCardComponent data={products.dataRows[index]} meta = {meta} type={type}></StatCardComponent>
        </CardGroup>
      );
    });
    return data_got;
  };

  return (
    <Container>
      {!products.dataRows && (
        <>
        <p style={{ fontWeight: "bold" }}>
          No Products to Show.
        </p>

        {type == 0 && 
              <Button className="mb-3 my_btn_upload" onClick={getAllProducts}>
                Load Products
             </Button>
        }
         {type == 1 && 
              <Button className="mb-3 my_btn_upload" onClick={getMyProducts}>
                Load Products
             </Button>
        }
         {type == 2 && 
              <Button className="mb-3 my_btn_upload" onClick={getRentedProducts}>
                Load Products
             </Button>
        }
        </>
      )}
      {products.dataRows && (
        <p style={{ fontWeight: "bold", fontSize: "25px" }}>All Products</p>
      )}
      
        {products.dataRows && allCards(products.dataRows)}
      
    </Container>
  );
}

export default StatisticsComponent;
