// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Users {

  mapping(address => uint) private addressToIndex;
  mapping(bytes32 => uint) private usernameToIndex;
  mapping(bytes32 => uint) private passwordToIndex;

  address[] private addresses;
  bytes32[] private usernames;
  bytes32[] private passwords;

  constructor() public {
    addresses.push(msg.sender);
    usernames.push('admin');
    passwords.push('Test123');
  }

  function hasUser(address userAddr) public view returns(bool hasIndeed){
    return (addressToIndex[userAddr] > 0 || userAddr == addresses[0]);
  }

  function usernameTaken(bytes32 username) public view returns(bool taken){
      return (usernameToIndex[username] > 0 || username == 'admin');
  }

  function createUser(bytes32 username, bytes32 pass) public returns(bool success){

      if(addressToIndex[msg.sender] > 0 || usernameToIndex[username] > 0){
        return false;
      }
      addresses.push(msg.sender);
      usernames.push(username);
      passwords.push(pass);

      addressToIndex[msg.sender] = addresses.length - 1;
      usernameToIndex[username] = addresses.length - 1;
      passwordToIndex[pass] = addresses.length - 1;

      return true;
  }

  function getUserByAddress(address userAddr) public view 
  returns(uint index, bytes32 username)
  {
    require(index < addresses.length);
    return(addressToIndex[userAddr], usernames[addressToIndex[userAddr]]);
  }

  function verifyUser(bytes32 username, bytes32 pass) public view
  returns(bool success, bytes32 user)
  {
    if(addressToIndex[msg.sender] == usernameToIndex[username]){
      if(passwordToIndex[pass] == addressToIndex[msg.sender]){
        return (true, username);
      }
    }
    return (false, "");
  }

  function getUserByAddr(address userAddr) public view
  returns(bytes32 username){
    require(hasUser(userAddr));
    return usernames[addressToIndex[userAddr]];
  }
}
