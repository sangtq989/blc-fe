var TicketMarketplace = artifacts.require("./TicketMarketplace.sol");

module.exports = (deployer) => {
  deployer.deploy(TicketMarketplace);
};
