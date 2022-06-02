var User = artifacts.require("Users");

module.exports = function(deployer){
    deployer.deploy(User);
};