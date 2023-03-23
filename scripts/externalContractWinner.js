// const { network } = require("hardhat");
const { Alchemy } = require("alchemy-sdk");

const { abi } = require("../artifacts/contracts/Mega.sol/Mega.json");
const externalContractAddress = require("./externalAccountAddress.json");
const externalContractAbi = require("./externalAccountABI.json");

async function main() {
  // make sure to replace the "GoofyGoober" reference with your own ERC-20 name!
  // const Token = await ethers.getContractFactory("Mega");
  // const token = await Token.deploy();

  const tokenAddress = "0xf91f32b476FAa31CeBC553a7e4f3EDbd50BD1f29";

  const alchemyProvider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.ALCHEMY_API_KEY
  );

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyProvider);

  // Connect to Token Instance
  const tokenContract = new ethers.Contract(tokenAddress, abi, signer);

  console.log(tokenContract);

  console.log("Contract Address to be approved:", externalContractAddress[0]);
  console.log("Connected contract Address:", tokenContract.address);

  await tokenContract.approve(externalContractAddress[0], "100");

  const externalContract = new ethers.Contract(
    externalContractAddress[0],
    externalContractAbi,
    signer
  );

  const winnerResponse = await externalContract.drop(
    tokenContract.address,
    "100"
  );

  console.log("Emit a Winner:");

  console.log(winnerResponse);

  const transactionHash = winnerResponse["hash"];

  console.log("TransactionHash:", transactionHash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
