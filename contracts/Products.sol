// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Products {

  struct product{
    string name;
    string description;
    uint id;
    address org_owner;
    address owner;
    address renter;
    uint price;
    uint rent;
    uint status;
    string reviews;
  }

  product[] private allProducts;
  uint private product_count = 1;
  
  constructor() public {
    product memory prod = product("Civic", "Honda Civic 2022", 0, msg.sender, msg.sender, msg.sender, 2, 1, 0, "");
    product memory prod1 = product("Chair", "A black chair", 0, msg.sender, msg.sender, msg.sender, 2, 1, 0, "");
    product memory prod2 = product("Camera", "Nikon Camera", 0, msg.sender, msg.sender, msg.sender, 2, 1, 0, "");
    product memory prod3 = product("Mercedees", "S600 Black", 0, msg.sender, msg.sender, msg.sender, 2, 1, 0, "");
      allProducts.push(prod);
      allProducts.push(prod1);
      allProducts.push(prod2);
      allProducts.push(prod3);
  }


  function addProduct(string memory name,string memory desc, uint price, uint rent) public returns(bool success){
      product memory prod = product(name, desc, product_count, msg.sender, msg.sender, msg.sender, price, rent, 0, "");
      product_count = product_count + 1;
      allProducts.push(prod);
      return true;
  }

    function buyProduct(uint id) public returns(bool success){
      allProducts[id].owner = msg.sender;
      allProducts[id].status = 1;  
      return true;
    }
   
   function rentProduct(uint id) public returns(bool success){
      allProducts[id].renter = msg.sender;
      allProducts[id].status = 2;  
      return true;
    }
    
    function getMyProducts(uint index) public view returns (string memory name, string memory desc, uint pr, uint ren, string memory reviews) {
      product storage prod = allProducts[index];
      if(prod.owner == msg.sender){
        return (prod.name, prod.description, prod.price, prod.rent, prod.reviews);
      }
    }

    function getMyProductsRent(uint index) public view returns (string memory name, string memory desc, uint pr, uint ren, string memory reviews) {
      product storage prod = allProducts[index];
      if(prod.renter == msg.sender && prod.renter != prod.owner){
        return (prod.name, prod.description, prod.price, prod.rent, prod.reviews);
      }
    }

    function addReview(uint index, string memory rev) public returns(bool success){
      if(allProducts[index].renter == msg.sender || allProducts[index].owner == msg.sender){
        allProducts[index].reviews = string.concat(allProducts[index].reviews, " : ");
        allProducts[index].reviews = string.concat(allProducts[index].reviews, rev);
        return true;
      }
      return false;
    }
    
    function getProductsCount() public view returns (uint count) {
      return allProducts.length;
    }

    function getProduct(uint index) public view returns (string memory name, string memory desc, uint pr, uint ren, string memory reviews) {
      product storage prod = allProducts[index];
      if(prod.owner != msg.sender && prod.status == 0){
        return (prod.name, prod.description, prod.price, prod.rent, prod.reviews);
      }
    }

    function unRentProduct(uint id) public returns(bool success){
      allProducts[id].renter = allProducts[id].owner;
      allProducts[id].status = 0;  
      return true;
    }
}
