// const { network } = require("hardhat");
const { Alchemy } = require("alchemy-sdk");

const { abi } = require("../artifacts/contracts/Mega.sol/Mega.json");
const externalContractAddress = require("./externalAccountAddress.json");
const externalContractAbi = require("./externalAccountABI.json");

async function main() {
  const tokenAddress = "0xf91f32b476FAa31CeBC553a7e4f3EDbd50BD1f29";

  const alchemyProvider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.ALCHEMY_API_KEY
  );

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyProvider);

  const externalContract = new ethers.Contract(
    externalContractAddress[0],
    externalContractAbi,
    signer
  );

  console.log("Started listening...");

  externalContract.on("Winner", (address, event) => {
    let info = {
      address: address,
      data: event,
    };
    console.log(JSON.stringify(info, null, 4));
  });
}

main();
