const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

//get path to biuld directory
const buildPath = path.resolve(__dirname, "build");

// delete the build directory
fs.removeSync(buildPath);

//get path to Campaign.sol file
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");

//read the content of Campaign.sol
const source = fs.readFileSync(campaignPath, "utf8");

// compile the Campaign.sol file n pull off the contract prop n assign
// to output
const output = solc.compile(source, 1).contracts;

//create a build folder
fs.ensureDirSync(buildPath);

//loop over the output n pull off :Campaign n :CampaignFactory
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
