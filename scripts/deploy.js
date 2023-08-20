const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploy the NFT Contract
  let _initBaseURI = 'ipfs/bafybeifmh3qjnfyw5l2tatw5sjj2jkytc4aedotuqbco3ai3goak4jkwty/'
  const nftContract = await hre.ethers.deployContract("CryptoDevsNFT",[
    _initBaseURI
  ]);
  await nftContract.waitForDeployment();
  console.log("CryptoDevsNFT deployed to:", nftContract.target);

  // Deploy the  Marketplace Contract
  const NftMarketplaceContract = await hre.ethers.deployContract(
    "NFTMarketplace"
  );
  await NftMarketplaceContract.waitForDeployment();
  console.log(
    "NFTMarketplace deployed to:",
    NftMarketplaceContract.target
  );

  // Deploy the DAO Contract
  const amount = hre.ethers.parseEther("1"); // You can change this value from 1 ETH to something else
  const daoContract = await hre.ethers.deployContract("CryptoDevsDAO", [
    NftMarketplaceContract.target,
    nftContract.target,
  ], { value: amount, });
  await daoContract.waitForDeployment();
  console.log("CryptoDevsDAO deployed to:", daoContract.target);

  // Sleep for 60 seconds to let Etherscan catch up with the deployments
  await sleep(60 * 1000);

  // Verify the NFT Contract
  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [_initBaseURI],
  });

  // Verify the  Marketplace Contract
  await hre.run("verify:verify", {
    address: NftMarketplaceContract.target,
    constructorArguments: [],
  });

  // Verify the DAO Contract
  await hre.run("verify:verify", {
    address: daoContract.target,
    constructorArguments: [
      NftMarketplaceContract.target,
      nftContract.target,
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});