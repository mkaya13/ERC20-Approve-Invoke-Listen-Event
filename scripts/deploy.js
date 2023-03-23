// const { network } = require("hardhat");
const { Alchemy } = require("alchemy-sdk");

const externalContractAddress = require("./externalAccountAddress.json");
const externalContractAbi = require("./externalAccountABI.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  //  const chainId = network.config.chainId;

  // const deployer = await ethers.provider.getSigner(0);

  console.log("Deploying contracts with the account:", deployer.address);

  //  console.log("Deployed network:", chainId);

  const weiAmount = (await deployer.getBalance()).toString();

  console.log("Account balance:", await ethers.utils.formatEther(weiAmount));

  // make sure to replace the "GoofyGoober" reference with your own ERC-20 name!
  const Token = await ethers.getContractFactory("Mega");
  const token = await Token.deploy();

  console.log("Token address:", token.address);

  // After deployment, send token to other addresses!
  await token.transfer(
    "0xfC9f3833a7BC5122ad60e4AE3A69Dd9550C5620a",
    "10000000000000000000"
  );

  await token.burn("10000000000000000000");

  await token.mint("50000000000000000000");

  // Approve the spender
  // await token.approve(externalContractAddress[0], "100000000000000000000");

  //console.log("Approved!");

  // Connect to External Contract
  // const alchemyProvider = new ethers.providers.AlchemyProvider(
  //   "goerli",
  //   process.env.GOERLI_RPC_URL
  // );
  //
  // console.log("alchemyProvider");
  //
  // const signer = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyProvider);
  //
  // // Contract Instance
  // const externalContract = new ethers.Contract(
  //   externalContractAddress[0],
  //   externalContractAbi,
  //   signer
  // );
  //
  // console.log("Connected to External Account");
  //
  // console.log("External Contract Address:", externalContract.address);
  //
  // const response = await externalContract.drop(
  //   token.address,
  //   "100000000000000000000"
  // );
  // console.log(response);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
